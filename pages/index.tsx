import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

interface Propertis {
  desc: {
    rich_text: {
      text: {
        content: string;
      };
    }[];
  };

  name: {
    title: {
      text: {
        content: string;
      };
    }[];
  };

  price: {
    number: number;
  };
}

interface Itmes {
  id: string;
  properties: Propertis;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Itmes[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const getItems = async () => {
    try {
      const response = await axios.get('/api/get-items');
      setProducts(response.data.items);
    } catch (err) {
      console.error('getItem API요청요류:', err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleClick = async () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(
        `/api/add-item?name=${inputRef.current.value}`,
      );

      alert(response.data.message);
    } catch (err) {
      console.error('API요청요류:', err);
    }
  };

  console.log(products);

  return (
    <div>
      <h1>Welcom</h1>
      <input
        className="border border-black mr-2"
        type="text"
        ref={inputRef}
        placeholder="name"
      />
      <button onClick={handleClick}>Add</button>

      <div>
        <p>Product List</p>
        {products &&
          products.map((items) => (
            <div key={items.id}>
              {items.properties.name.title[0].text.content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
