import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_URL } from "../../../config";
import { cookieParser } from "../../../lib/utils";

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

    const setCookieHeader = response.headers["set-cookie"];

    // 클라이언트 응답에 쿠키 설정
    if (setCookieHeader) {
      res.setHeader("Set-Cookie", setCookieHeader);
    }

    // 클라이언트 응답에 쿠키 내용을 포함
    const cookies = cookieParser(String(setCookieHeader));
    const accessToken = cookies["x-access-token"] || "";

    res.status(200).json({ accessToken });

    return;
  } catch (error: any) {
    res.status(error?.response?.status || 500).json(error?.response?.data);
  }
}
