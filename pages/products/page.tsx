import { CATEGORY_MAP, FILTERS } from '@/constant/products';
import { Select } from '@mantine/core';
import { products } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const MoreScroll = () => {
  const Take = 9;
  const [skip, setSkip] = useState<number>(0);
  const [products, setProducts] = useState<products[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTERS[0].value,
  );

  const getScrollProducts = async () => {
    try {
      const response = await axios.get(
        `/api/get-more-scroll?skip=0&take=${Take}&category=${selectedFilter}`,
      );

      if (response.status === 200) {
        setProducts(response.data.items);
      }
    } catch (err) {
      console.error('API요청 오류: ', err);
    }
  };

  useEffect(() => {
    getScrollProducts();
  }, [selectedFilter]);

  const getMoreProductScroll = useCallback(async () => {
    const next = skip + Take;
    try {
      const response = await axios.get(
        `/api/get-more-scroll?skip=${next}&take=${Take}`,
      );

      if (response.status === 200 && response.data.items.length !== 0) {
        setProducts((cur) => {
          let copy = [...cur, ...response.data.items];
          return copy;
        });
        setSkip(next);
      }
    } catch (err) {
      console.error('API요청 오류: ', err);
    }
  }, [skip, products]);

  return (
    <div className="justify-center grid p-20 w-screen mb-3">
      <div className="mb-5">
        <Select
          value={selectedFilter}
          onChange={setSelectedFilter}
          data={FILTERS}
        />
      </div>
      <div className="grid grid-cols-3 gap-5 text-center">
        {products &&
          products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded-xl"
                src={item.image_url ?? ''}
                alt="image"
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcfPJ/PQAHLgLcHWCcqQAAAABJRU5ErkJggg=="
              />
              <p>{item.price.toLocaleString('ko-KR')}</p>
              <span>{CATEGORY_MAP[item.category_id - 1]}</span>
            </div>
          ))}
      </div>
      <button
        onClick={getMoreProductScroll}
        className="bg-gray-300 w-auto rounded-xl mt-5 hover:bg-gray-400"
      >
        더 보기
      </button>
    </div>
  );
};

export default MoreScroll;
