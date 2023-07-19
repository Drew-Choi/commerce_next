import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getProduct = async (id: number) => {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: 'No ID' });
    return;
  }
  try {
    const response = await getProduct(Number(id));
    res.status(200).json({ items: response, message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
