import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { deleteApi, getApi } from "@/lib/fetcher";
import { toast } from "sonner";

interface UserPayload {
  userId: string;
  exp: number;
  iat: number;
}

type User = {
  _id: string;
  username: string;
  email: string;
  avatar: { public_id: string; imgUrl: string };
  role: string;
};

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<User | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", cookies.token],
    queryFn: async () => {
      if (cookies.token) {
        const decodedToken: UserPayload = await jwtDecode(cookies.token);
        if (decodedToken) {
          return getApi(`/user/${decodedToken.userId}`, cookies.token);
        }
      }
    },
    enabled: false,
    retry: false,
  });

  const logout = () => {
    deleteApi(`/auth/logout`, cookies.token)
      .then(() => {
        setUser(null);
        removeCookie("token");
        window.location.reload();
        toast.success("Logout Successfully");
      })
      .catch(() => {
        toast.error("Failed to logout! Try again");
      });
  };

  useEffect(() => {
    if (cookies.token) {
      refetch();
    }
  }, [cookies.token, refetch]);

  useEffect(() => {
    if (data && !isLoading && !error) {
      setUser(data.body);
    }
  }, [data, isLoading, error]);

  return {
    token: cookies.token,
    user: user,
    setToken: (token: string) => setCookie("token", token),
    removeToken: logout,
    invalidateAuth: refetch,
  };
};
