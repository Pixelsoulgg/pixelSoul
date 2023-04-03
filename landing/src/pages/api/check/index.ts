import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {    
    const { accessToken } = await getAccessToken(req, res);   
    res.status(200).json({accessToken});
  } catch (e: unknown) {
    const message = (e as Error).message;
    res.status(500).json({ error: message });
  }
});
