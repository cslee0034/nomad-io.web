import { NextApiRequest, NextApiResponse } from "next";
import { cookieParser } from "../../../lib/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie;

  const cookies = cookieParser(String(cookieHeader));
  const accessToken = cookies["x-access-token"] || "";

  res.status(200).json({ accessToken });
}
