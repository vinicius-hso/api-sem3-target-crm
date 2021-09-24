import React from "react";
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
}

export default new ContactService();
