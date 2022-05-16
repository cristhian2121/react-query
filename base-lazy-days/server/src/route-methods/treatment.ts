import { Request, Response } from 'express';

import db from '../db-func/index.js';

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    await new Promise(resolve => {
      setTimeout(() => resolve(true), 2000)
    })
    const treatments = await db.getTreatments();
    return res.status(200).json(treatments);
  } catch (e) {
    return res.status(500).json({ message: `could not get treatments: ${e}` });
  }
}

export default {
  get,
};
