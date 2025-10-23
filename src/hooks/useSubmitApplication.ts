import { useState } from "react";
import { submitApplication } from "../api";

export function useSubmitApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (title: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitApplication(title);
      return result;
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      setError("Ошибка при отправке заявки. Попробуйте ещё раз.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
}
