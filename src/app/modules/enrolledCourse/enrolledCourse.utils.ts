export const calculateGradeAndPoints = (totalMarks: number) => {
    let grade: string = 'NA';
    let gradePoint: number = 0;

    if (totalMarks >= 0 && totalMarks <= 19) {
        grade = 'F';
        gradePoint = 0.0;
    } else if (totalMarks >= 20 && totalMarks <= 39) {
        grade = 'D';
        gradePoint = 2.0;
    } else if (totalMarks >= 40 && totalMarks <= 59) {
        grade = 'C';
        gradePoint = 3.0;
    } else if (totalMarks >= 60 && totalMarks <= 79) {
        grade = 'B';
        gradePoint = 3.5;
    } else if (totalMarks >= 80 && totalMarks <= 100) {
        grade = 'A';
        gradePoint = 4.0;
    }

    const result = { grade, gradePoint };

    return result;
}