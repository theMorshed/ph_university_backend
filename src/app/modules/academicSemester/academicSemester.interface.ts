// Defining types for academic semester names.
export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall';

// Defining types for academic semester codes.
export type TAcademicSemesterCode = '01' | '02' | '03';

// Defining a type for months of the year.
export type TMonths = 
  "January" | "February" | "March" | "April" | "May" | "June" | "July" | 
  "August" | "September" | "October" | "November" | "December";

// Defining the structure of an academic semester object.
export type TAcademicSemester = {
  name: TAcademicSemesterName;   // Name of the academic semester (e.g., 'Autumn').
  code: TAcademicSemesterCode;   // Code representing the academic semester (e.g., '01').
  year: string;                  // The academic year (e.g., '2024').
  startMonth: TMonths;           // The starting month of the academic semester.
  endMonth: TMonths;             // The ending month of the academic semester.
}

// Defining a type for a mapper that maps semester names to codes.
export type TAcademicSemesterNameCodeMapper = Record<string, string>;

