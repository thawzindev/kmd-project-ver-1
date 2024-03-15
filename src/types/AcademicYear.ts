export interface AcademicYear {
    id: string;
    academicYear: string;
    startDate: string;
    closureDate: string;
    finalClosureDate: string | null;
    isActive: boolean | null;
  }