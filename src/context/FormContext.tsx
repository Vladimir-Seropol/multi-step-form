import { createContext } from "react";
import type { FormContextType, FormData } from "../types/types";

export const defaultData: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  workPlace: "",
  address: "",
  loanAmount: 200,
  loanTerm: 10,
};

export const FormContext = createContext<FormContextType>({
  data: defaultData,
  updateData: () => {},
  resetForm: () => {},
});
