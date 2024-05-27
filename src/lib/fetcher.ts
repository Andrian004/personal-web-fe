import axios from "axios";

// get
export const getApi = async (endpoint: string) => {
  const response = await axios.get(import.meta.env.VITE_API_URL + endpoint, {
    withCredentials: true,
  });
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
export const deleteApi = async (
  endpoint: string,
  token?: string,
  params?: unknown
) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await axios.delete(import.meta.env.VITE_API_URL + endpoint, {
    headers: headerOptions,
    params: params,
  });
  return response.data;
};
