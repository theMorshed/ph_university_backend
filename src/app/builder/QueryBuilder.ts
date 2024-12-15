// Importing the `Query` type from Mongoose to work with MongoDB queries and ensure type safety.
import { Query } from "mongoose";

/**
 * A class for building and chaining MongoDB queries.
 * Provides methods for searching, filtering, sorting, pagination, and selecting fields.
 */
class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;  // Mongoose query object
    public query: Record<string, unknown>;  // The query parameters provided by the user

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    /**
     * Adds search functionality to the query.
     * Searches for a term in the specified fields if a `searchTerm` is provided.
     * 
     * @param searchableFields - List of fields to search on.
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with the search filter applied.
     */
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm; // Extracts the search term from the query parameters
        if (searchTerm) {
            // Adds a regex search to the query for the specified fields
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({            
                    [field]: {$regex: searchTerm, $options: 'i'}, // Case-insensitive search
                }))
            });
        }

        return this;    
    }

    /**
     * Applies filters to the query by removing unwanted fields.
     * The fields `searchTerm`, `sort`, `limit`, `page`, and `fields` are excluded from the filter query.
     * 
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with filters applied.
     */
    filter() {
        const queryObj = {...this.query}; // Copies the query object to avoid mutation
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']; // Fields to exclude from filtering
        excludeFields.forEach(el => delete queryObj[el]); // Removes excluded fields from the query
        this.modelQuery = this.modelQuery.find(queryObj); // Applies the filter to the model query

        return this;
    }

    /**
     * Sorts the query results based on the `sort` parameter.
     * If no sort is provided, it defaults to sorting by `createdAt` in descending order.
     * 
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with sorting applied.
     */
    sort() {
        const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'; // Default sort by createdAt descending
        this.modelQuery = this.modelQuery.sort(sort); // Applies sorting to the query

        return this;
    }

    /**
     * Adds pagination to the query.
     * Paginates based on `page` and `limit` parameters. Defaults to page 1 and limit 10.
     * 
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with pagination applied.
     */
    paginate() {
        const page = Number(this?.query?.page) || 1; // Default to page 1 if not provided
        const limit = Number(this?.query?.limit) || 10; // Default to limit 10 if not provided
        const skip = (page - 1) * limit; // Calculates the number of documents to skip
        this.modelQuery = this.modelQuery.skip(skip).limit(limit); // Applies pagination to the query

        return this;
    }

    /**
     * Selects specific fields to include or exclude in the query results.
     * By default, excludes the `__v` field.
     * 
     * @returns {QueryBuilder<T>} - Returns the updated QueryBuilder instance with field selection applied.
     */
    fields() {
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'; // Default to excluding `__v` field
        this.modelQuery = this.modelQuery.select(fields); // Applies field selection to the query

        return this;
    }
}

export default QueryBuilder;