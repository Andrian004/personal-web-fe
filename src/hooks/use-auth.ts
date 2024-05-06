import { useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<JwtPayload | null>(null);

  if (cookies.token) {
    const decodedToken = jwtDecode(cookies.token);
    if (decodedToken) setUser(decodedToken);
  }

  return {
    token: cookies.token,
    user: user,
    setToken: (token: string) => setCookie("token", token),
    removeToken: () => removeCookie("token"),
  };
};
