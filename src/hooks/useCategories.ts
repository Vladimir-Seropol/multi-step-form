import { useEffect, useState } from "react";
import { getCategories } from "../api";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((cats) => {
        if (isMounted) {
          setCategories(cats);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) {
          setError("Ошибка при загрузке категорий");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
};
