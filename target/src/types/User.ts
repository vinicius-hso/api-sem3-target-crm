export interface IUser {
  id?: string;
  name: string;
  email: string;
  role: string;
  picture: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
