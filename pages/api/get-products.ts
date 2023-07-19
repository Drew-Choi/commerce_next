import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async () => {
  try {
    const response = await prisma.products.findMany();
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};

// type Data = {
//   items?: any;
//   message: string;
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   try {
//     const response = await getItems();
//     res.status(200).json({ items: response?.results, message: 'Success' });
//   } catch (err) {
//     res.status(400).json({ message: 'Fail' });
//   }
// };

// export default handler;
