import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonths } from "./academic_semester_interface";

export const academicSemesterName: TAcademicSemesterName[] = ["Autumn", "Summer", "Fall"];
export const academicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
export const Months: TMonths[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03"
}