import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const dataBaseId = process.env.NOTION_ID;

export const getItems = async () => {
  try {
    const response = await notion.databases.query({
      database_id: dataBaseId as string,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    return response?.results;
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
