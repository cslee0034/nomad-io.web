import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { checkSuccess } from "@/lib/utils";
import { SignUpRequest } from "../interfaces/signup-request";
import { LoginResponse } from "@/interfaces/login-response";
import { useUserStore } from "../stores/useUserStore";
import dayjs from "dayjs";

export const useSignUp = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const router = useRouter();

  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
  }: SignUpRequest) => {
    const response: LoginResponse = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
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

  const signUpMutation = useMutation({
    mutationFn: signUp,
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

  return signUpMutation;
};
