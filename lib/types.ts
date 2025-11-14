export type userType = "instructor" | "learner";

export type SortType = "id_desc" | "capacity_desc" | "rate_desc";

export interface ClassData {
  id?: number;
  title: string;
  capacity: number;
  applicants: number;
  instructor: string;
  sellingPrice: number;
}

export type ClassListData = Array<ClassData> | [];

export interface ClassListResponse {
  data: ClassData[];
  next: number | null;
  prev: number | null;
}

export interface SelectedClass {
  id: number;
  capacity: number;
  applicants: number;
  sellingPrice: number;
}
