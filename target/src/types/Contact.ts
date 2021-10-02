export interface IContact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  company_id?: string;
  tag?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
<<<<<<< HEAD
=======

export interface IContactContext {
  useCreateContactModal: () => void;
  createContactModal: boolean;
}
>>>>>>> 7523e5ad18f619c932d28d6f4c7bdf2d6cd661db
