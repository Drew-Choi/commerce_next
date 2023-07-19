import CustomEditor from '@/components/Editor';
import axios from 'axios';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';

const Edit: NextPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );

  useEffect(() => {
    async function getProduct() {
      try {
        if (productId) {
          const response = await axios.get(`/api/get-product?id=${productId}`);

          if (response.data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(response.data.items.contents)),
              ),
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    getProduct();
  }, [productId]);

  const handleSave = () => {
    async function updateProduct() {
      try {
        const response = await axios.post('/api/update-product', {
          id: productId,
          contents: JSON.stringify(
            convertToRaw(editorState!.getCurrentContent()),
          ),
        });

        if (response.status === 200) {
          alert('Success');
        } else {
          alert('Fail');
        }
      } catch (err) {
        console.error(err);
      }
    }
    updateProduct();
  };

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="When Great Minds Don’t Think Alike"
        />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta
          property="og:image"
          content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        />
      </Head>
      <Carousel>
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      {editorState !== null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Edit;
