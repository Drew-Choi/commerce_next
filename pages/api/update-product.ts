import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const updateProduct = async (id: number, contents: string) => {
  try {
    const response = await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        contents: contents,
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
  const { id, contents } = req.body;
  if (!id || !contents) {
    res.status(400).json({ message: 'No ID & Contents' });
    return;
  }
  try {
    const response = await updateProduct(Number(id), contents);
    res.status(200).json({ items: response, message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
