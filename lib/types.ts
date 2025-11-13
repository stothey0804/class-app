export type userType = "instructor" | "learner";

export interface ClassData {
  id?: number;
  title: string;
  capacity: number;
  applicants: number;
  instructor: string;
  sellingPrice: number;
}

export interface ClassListResponse {
  data: ClassData[];
  next: number | null;
  prev: number | null;
}

export type ClassListData = Array<ClassData> | [];
