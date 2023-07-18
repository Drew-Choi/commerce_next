import axios from 'axios';
import { NextPage } from 'next';
import { useRef } from 'react';

const Home: NextPage = () => {
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
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Home;
