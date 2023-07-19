import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100),
).map((_, index) => ({
  name: `Dark Jean ${index + 1}`,
  contents: `{"blocks":[{"key":"50gkh","text":"안녕 ${
    index + 1
  }","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":2,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"83ckl","text":"이야 신기하다","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}}],"entityMap":{}}`,
  category_id: 1,
  image_url: `https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/${
    (index + 1) % 10 === 0 ? 10 : (index + 1) % 10
  }.jpg`,
  price: Math.floor(Math.random() * (10000 - 20000) + 20000),
}));

const main = async () => {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({ data: p });
    console.log('Create id: ', product.id);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
