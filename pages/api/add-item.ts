import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const dataBaseId = process.env.NOTION_ID;

const addItem = async (name: string) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: dataBaseId as string },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error(JSON.stringify(err));
  }
};

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'No Name' });
  }

  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} added` });
  } catch (err) {
    res.status(400).json({ message: `Fail to ${name} added` });
  }
};

export default handler;
