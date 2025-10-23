import { useForm, FormProvider as RHFProvider } from "react-hook-form";
import type { FormData, FormProviderProps } from "../types/types";

export const FormProvider = ({ children }: FormProviderProps) => {
  const methods = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      workPlace: "",
      address: "",
      loanAmount: 200,
      loanTerm: 10,
    },
    mode: "onBlur",
  });

  return <RHFProvider {...methods}>{children}</RHFProvider>;
};