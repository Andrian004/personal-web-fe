import { Project } from "@/interfaces/project-interface";

// get
export const getApi = async (endpoint: string): Promise<Project[]> => {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint);
  const data = await response.json();
  return data.body;
};

// post
export const postApi = async (endpoint: string, body: unknown) => {
  const token = "";
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// delete
export const deleteApi = async (endpoint: string) => {
  const token = "";
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
