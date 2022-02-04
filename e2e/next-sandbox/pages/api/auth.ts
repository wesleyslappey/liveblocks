import { authorize } from "@liveblocks/node";
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (!API_KEY) {
    return res.status(403).end();
  }

  const room = req.body.room;

  const response = await authorize({
    room,
    secret: API_KEY,
    liveblocksAuthorizeEndpoint:
      process.env.LIVEBLOCKS_AUTHORIZE_ENDPOINT ||
      "https://liveblocks.io/api/authorize",
  });
  return res.status(response.status).end(response.body);
}
