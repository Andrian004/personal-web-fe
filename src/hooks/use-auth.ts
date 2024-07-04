import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteApi, getApi, postApi } from "@/lib/fetcher";
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
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "refresh_token",
  ]);
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
    deleteApi(`/auth/logout`)
      .then(() => {
        setUser(null);
        removeCookie("token");
        removeCookie("refresh_token");
        window.location.reload();
        toast.success("Logout Successfully");
      })
      .catch(() => {
        toast.error("Failed to logout! Try again");
      });
  };

  const refreshMutation = useMutation({
    mutationFn: (refreshToken: string) =>
      postApi("/auth/refresh", {
        refreshToken: refreshToken,
      }),
    onSuccess: (data) => {
      setCookie("token", data.token);
      setUser(data.body);
    },
    onError: () => {
      logout();
    },
    retry: false,
  });

  const refreshToken = useCallback(() => {
    if (cookies.refresh_token) {
      refreshMutation.mutate(cookies.refresh_token);
    }
  }, [cookies.refresh_token, refreshMutation]);

  useEffect(() => {
    if (cookies.token) {
      refetch();
    }
  }, [cookies.token, refetch]);

  useEffect(() => {
    if (data && !isLoading && !error) {
      setUser(data.body);
    } else if (error?.message === "jwt expired") {
      refreshToken();
    }
  }, [data, isLoading, error, refreshToken]);

  return {
    token: cookies.token,
    user: user,
    setToken: (token: string) => setCookie("token", token),
    setRefreshToken: (token: string) => setCookie("refresh_token", token),
    refreshToken: refreshToken,
    removeToken: logout,
    invalidateAuth: refetch,
  };
};
