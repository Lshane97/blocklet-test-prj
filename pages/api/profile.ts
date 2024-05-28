// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { wrapServerError, wrapServerSuccess } from '@/utils/response';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '@blocklet/sdk';
import * as v from 'valibot';

const db = new Database('profile.db');

const phoneRegex = /^1[3-9]\d{9}$/;

const ProfileSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.email(),
    v.check((input) => !input.includes(' '))
  ),
  name: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.check((input) => !input.includes(' '))
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.check((input) => phoneRegex.test(input) && !input.includes(' '))
  ),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const user = await db.findOne({ userId: 1 });
    res.status(200).json(
      wrapServerSuccess(
        user || {
          email: 'jone_doe@test.com',
          phone: '13122229999',
          name: 'JoneDoe',
        }
      )
    );
  } else if (req.method === 'POST') {
    const profile: Profile = req.body.profile;
    const result = v.safeParse(ProfileSchema, profile);
    if (result.success) {
      const ret = await db.update(
        { userId: 1 },
        {
          ...result.output,
          userId: 1,
        },
        { upsert: true }
      );
      res.status(200).json(wrapServerSuccess(result.output));
    } else {
      res.status(400).json(wrapServerError(400, 'Data Format Wrong'));
    }
  } else {
    res.status(405).json(wrapServerError(405, 'Method Not Allowed'));
  }
}
