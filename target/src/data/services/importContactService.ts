import React from "react";
import { pipe } from "rxjs";
import { DealTypes } from "types/Deal";
import { pipeline } from "types/Modal";
import { serviceApi as api } from "./ServiceApi";

export const Teste = async (contact) => {
  try {
    await api.post("/contact", contact);
  } catch (err) {
    return err;
  }
};
