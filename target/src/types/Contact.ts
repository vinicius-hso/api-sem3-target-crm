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
  company?: {
    id: string;
  };
}

export interface IContactContext {
  useCreateContactModal: () => void;
  createContactModal: boolean;
  useUpdateContactModal: () => void;
  updateContactModal: boolean;
}