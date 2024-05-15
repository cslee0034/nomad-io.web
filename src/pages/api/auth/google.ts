import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    email,
    provider,
    firstName = "",
    lastName = "",
    expiresIn,
    error,
  } = req.query;
  const accessToken = req.cookies["x-access-token"];
  const refreshToken = req.cookies["x-access-token"];

  if (error || !accessToken || !refreshToken) {
    res.writeHead(302, {
      Location: `/oauth?error=${encodeURIComponent(
        "Something went wrong... cannot login right now."
      )}`,
    });
    res.end();
    return;
  }

  const locationUrl = `/oauth?id=${encodeURIComponent(
    id as string
  )}&email=${encodeURIComponent(email as string)}&provider=${encodeURIComponent(
    provider as string
  )}&firstName=${encodeURIComponent(
    firstName as string
  )}&lastName=${encodeURIComponent(
    lastName as string
  )}&expires=${encodeURIComponent(expiresIn as string)}`;

  res.writeHead(302, { Location: locationUrl });
  res.end();
  return;
}
