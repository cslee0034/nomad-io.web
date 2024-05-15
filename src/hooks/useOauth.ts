import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LoginResponse } from "@/interfaces/login-response";
import { useUserStore } from "../stores/useUserStore";
import dayjs from "dayjs";

export const useOauth = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const router = useRouter();

  const oauth = async (query: LoginResponse) => {
    return query;
  };

  const setExpireDate = (expiresIn: number) => {
    const expireDate = dayjs().add(expiresIn, "second").toString();
    localStorage.setItem("expireDate", expireDate);
  };

  const oauthMutation = useMutation({
    mutationFn: oauth,
    onSuccess: (response) => {
      setExpireDate(response.expiresIn);

      setUserInfo({
        id: response.id,
        email: response.email,
        provider: response.provider,
        firstName: response.firstName,
        lastName: response.lastName,
      });

      router.push("/");
    },
    onError: (error) => {
      return error;
    },
  });

  return oauthMutation;
};
