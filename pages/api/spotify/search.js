import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  let accessToken;
  const token = await getToken({ req, secret: "tae" });
  accessToken = token.accessToken;

  res.status(200).json({ token });
};
