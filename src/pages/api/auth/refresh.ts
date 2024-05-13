import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_URL } from "../../../config";
import { checkSuccessNextApi } from "../../../lib/utils";
import { LoginResponse } from "../../../interfaces/login-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prevCookies = req.headers.cookie;

  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Cookie: prevCookies,
        },
        withCredentials: true,
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
        error?.response?.data?.message || "Error occurred while logging in.",
    });

    return;
  }
}
