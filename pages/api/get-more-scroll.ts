import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getMoreScroll = async (skip: number, take: number) => {
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
    });
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { skip, take } = req.query;
  if (!skip || !take) {
    res.status(400).json({ message: 'No Request Information' });
    return;
  }
  try {
    const response = await getMoreScroll(Number(skip), Number(take));
    res.status(200).json({ items: response });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
