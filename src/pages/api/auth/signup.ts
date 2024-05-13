import type { NextApiRequest, NextApiResponse } from "next";
import { SuccessResponse } from "@/interfaces/success-response";
import axios from "axios";
import { API_URL } from "@/config";
import { checkSuccessNextApi } from "@/lib/utils";
import { LoginResponse } from "@/interfaces/login-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const response: SuccessResponse = await axios.post(
      `${API_URL}/auth/local/sign-up`,
      {
        firstName,
        lastName,
        email,
        password,
        provider: "local",
      }
    );

    checkSuccessNextApi(response);

    const setCookieHeader = response.headers["set-cookie"];

    if (setCookieHeader) {
      res.setHeader("Set-Cookie", setCookieHeader);
    }

    res.status(200).json(response.data as LoginResponse);

    return;
  } catch (error: any) {
    res.status(error?.response?.status || 500).json({
      message:
        error?.response?.data?.message || "Error occurred while sign up.",
    });

    return;
  }
}
