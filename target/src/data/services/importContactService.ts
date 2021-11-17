import { serviceApi as api } from "./ServiceApi";

export const Teste = async (contact) => {
  try {
    await api.post("/contact", contact);
  } catch (err) {
    return err;
  }
};
