import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategoies = async () => {
  try {
    const response = await prisma.products.findMany();
    return response;
  } catch (err) {
    console.error('API요청오류: ', err);
  }
};
