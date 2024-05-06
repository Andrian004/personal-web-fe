import { Project } from "@/interfaces/project-interface";

// get
export const getApi = async (endpoint: string): Promise<Project[]> => {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint);
  const data = await response.json();
  return data.body;
};

// post
export const postApi = async (
  endpoint: string,
  formData: unknown,
  token?: string
) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const data = await fetch(import.meta.env.VITE_API_URL + endpoint, {
    method: "POST",
    headers: headerOptions,
    body: JSON.stringify(formData),
  });
  return data.json();
};

// delete
export const deleteApi = async (endpoint: string, token?: string) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
    method: "DELETE",
    headers: headerOptions,
  });
  return response.json();
};
