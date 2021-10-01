import React from "react";
import { IContact } from "types/Contact";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./serviceApi";

class ContactService {
  private headers: object;

  async getContacts() {
    try {
      const { data } = await api.get("/contact", {
        headers: this.headers,
      });

      return data;
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
      const { data } = await api.post("/contact", body, {
        headers: this.headers,
      });

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
      const { data } = await api.put(`/contact/${id}`, body, {
        headers: this.headers,
      });

      return data.message;
    } catch (error) {
      return error.message;
    }
  }
}

export default new ContactService();
