import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_6XBpJMiFDs9tyYi6uIxKwVTefOgigcsvCuRfuqsTZoN',
});

const dataBaseId = 'fec8a9c5e8fe4a0b8db04101d70d6535';

const getItems = async () => {
  try {
    const response = await notion.databases.query({
      database_id: dataBaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

type Data = {
  items?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail' });
  }
};

export default handler;
