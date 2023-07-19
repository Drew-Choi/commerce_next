import { css } from '@emotion/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// interface Propertis {
//   desc: {
//     rich_text: {
//       text: {
//         content: string;
//       };
//     }[];
//   };

//   name: {
//     title: {
//       text: {
//         content: string;
//       };
//     }[];
//   };

//   price: {
//     number: number;
//   };
// }

// interface ItmesProps {
//   items: {
//     id: string;
//     properties: Propertis;
//   }[];
// }

interface Itme {
  name: string;
  id: string;
}

export const getServerSideProps = async () => {
  try {
    console.log('server');
    const items = await prisma.products.findMany();
    return {
      props: { items },
    };
  } catch (err) {
    console.error('getItem API 요청 오류:', err);
    return {
      props: { items: [] },
    };
  }
};

const Home: NextPage<{ items: Itme[] }> = ({ items }) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(
        `/api/add-item?name=${inputRef.current.value}`,
      );

      router.reload();
      alert(response.data.message);
    } catch (err) {
      console.error('API요청요류:', err);
    }
  };

  return (
    <div>
      <h1>Welcom</h1>
      <input
        className="border border-black mr-2"
        type="text"
        ref={inputRef}
        placeholder="name"
      />
      <button
        css={css`
          background-color: beige;
          font-size: 20px;
          :hover {
            background-color: red;
          }
        `}
        onClick={handleClick}
      >
        Add
      </button>

      <div>
        <p>Product List</p>
        {/* {items &&
          items.map((item) => (
            <div key={item.id}>
              {item.properties.name.title[0].text.content}
            </div>
          ))} */}
        {items && items.map((item) => <div key={item.id}>{item.name}</div>)}
      </div>
    </div>
  );
};

export default Home;
