import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  userId: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    if (cookies.token) {
      const decodedToken: UserPayload = jwtDecode(cookies.token);
      if (decodedToken) setUser(decodedToken);
    }
  }, [cookies.token]);

  return {
    token: cookies.token,
    user: user,
    setToken: (token: string) => setCookie("token", token),
    removeToken: () => {
      removeCookie("token");
      setUser(null);
    },
  };
};

// export const useAuth = () => {
//   return {
//     token: "kjlasldkja",
//     user: {
//       userId: "kjnaksjdn",
//       username: "kjaejkfa",
//     },
//     setToken: (token: string) => token,
//     removeToken: () => "shbdjbhsd",
//   };
// };
