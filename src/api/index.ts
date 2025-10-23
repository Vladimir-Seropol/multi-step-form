export const getCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list");

    if (!res.ok) {
      throw new Error(`Ошибка при получении категорий: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Некорректный формат данных от API");
    }

    return data as string[];
  } catch (error) {
    console.error("Ошибка в getCategories:", error);

    return [];
  }
};

export const submitApplication = async (title: string) => {
  try {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error(`Ошибка при отправке заявки: ${res.status}`);
    }

    const data = await res.json();

    if (!data || typeof data !== "object") {
      throw new Error("Некорректный ответ от API");
    }

    return data;
  } catch (error) {
    console.error("Ошибка в submitApplication:", error);
    throw error;
  }
};
