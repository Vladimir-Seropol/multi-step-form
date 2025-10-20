import { useState, type ReactNode } from "react";
import { FormContext, defaultData } from "./FormContext";
import type { FormData, FormContextType } from "../types/types";

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormData>(defaultData);

  const updateData = (newData: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...newData }));

  const resetForm = () => setData(defaultData);

  const value: FormContextType = {
    data,
    updateData,
    resetForm
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};