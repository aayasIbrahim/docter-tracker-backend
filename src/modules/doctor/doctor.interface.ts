export interface IDoctor {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}

export interface IDoctorDocument extends IDoctor, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDoctorQuery {
  searchTerm?: string;
  specialization?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
