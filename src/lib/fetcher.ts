import axios from "axios";

// get
export const getApi = async (endpoint: string, token?: string) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + endpoint, {
      headers: headerOptions,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.status !== 500) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error");
  }
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

  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + endpoint,
      formData,
      { headers: headerOptions, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response && error.status !== 500) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error");
  }
};

// put
export const putApi = async (
  endpoint: string,
  formData: unknown,
  token?: string
) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.put(
      import.meta.env.VITE_API_URL + endpoint,
      formData,
      { headers: headerOptions, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.status !== 500) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error");
  }
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

  try {
    const response = await axios.delete(
      import.meta.env.VITE_API_URL + endpoint,
      {
        headers: headerOptions,
        params: params,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.status !== 500) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error");
  }
};

// update (formData)
export const patchFormApi = async (
  endpoint: string,
  formData: FormData,
  token?: string
) => {
  const headerOptions = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "multipart/form-data",
  };

  try {
    const response = await axios.patch(
      import.meta.env.VITE_API_URL + endpoint,
      formData,
      { headers: headerOptions, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.status !== 500) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error");
  }
};
