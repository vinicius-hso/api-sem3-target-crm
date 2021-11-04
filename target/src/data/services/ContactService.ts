import React from "react";
import { IContact } from "types/Contact";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";

class ContactService {
  async getContacts() {
    try {
      const { data } = await api.get("/contact?with=company");

      return data;
    } catch (error) {
      return error;
    }
  }

  async getContact(id: string): Promise<IContact> {
    try {
      const response = await api.get(`/contact/${id}?with=company`);

      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deleteContact(id: string): Promise<string> {
    try {
      const response = await api.delete(`/contact/${id}`);

      return response.data.message;
    } catch (error) {
      return error;
    }
  }

  async createContact({
    name,
    email,
    phone,
    city,
    state,
    company_id,
    tag,
  }: IContact): Promise<string> {
    const body: IContact = {
      name,
      email,
      phone,
      city,
      state,
      company_id,
      tag,
    };

    try {
      const { data } = await api.post("/contact", body);

      return data.id;
    } catch (error) {
      return error;
    }
  }

  async updateContact({
    id,
    name,
    email,
    phone,
    city,
    state,
    company_id,
    tag,
  }: IContact): Promise<string> {
    const body: IContact = {
      name,
      email,
      phone,
      city,
      state,
      company_id,
      tag,
    };

    try {
      const { data } = await api.put(`/contact/${id}?with=company`, body);

      return data;
    } catch (error) {
      return error.message;
    }
  }
}

export default new ContactService();
