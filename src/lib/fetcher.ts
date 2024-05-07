import axios, { AxiosResponse } from "axios";
import { Project } from "@/interfaces/project-interface";
import { SuccessResponse } from "@/interfaces/api-interface";

// get
export const getApi = async (endpoint: string) => {
  const response: AxiosResponse<SuccessResponse<Project[]>> = await axios.get(
    import.meta.env.VITE_API_URL + endpoint
  );
  return response.data;
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

  const response = await axios.post(
    import.meta.env.VITE_API_URL + endpoint,
    formData,
    { headers: headerOptions }
  );
  return response.data;
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
