export const getCategories = async (): Promise<string[]> => {
  const res = await fetch("https://dummyjson.com/products/category-list");
  return res.json();
};

export const submitApplication = async (title: string) => {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};
