import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { checkSuccess } from "@/lib/utils";
import { LoginRequest } from "@/interfaces/login-request";
import { LoginResponse } from "@/interfaces/login-response";
import { useUserStore } from "../stores/useUserStore";
import dayjs from "dayjs";

export const useLogin = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const router = useRouter();

  const login = async ({ email, password }: LoginRequest) => {
    const response: LoginResponse = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    checkSuccess(response);

    return response;
  };

  const setExpireDate = (expiresIn: number) => {
    const expireDate = dayjs().add(expiresIn, "second").toString();
    localStorage.setItem("expireDate", expireDate);
  };

  const loginMutation = useMutation({
    mutationFn: login,
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

  return loginMutation;
};
