import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Body from '../../components/Body/Body';
import Header from '../../components/Header';
import Head from 'next/head';

import { getDebates } from '../../providers/apollo/queries';
import Loading from '../../components/Loading';
export default function Home() {
  const router = useRouter();
  const { tag } = router.query;
  const [page, setPage] = useState({
    debatesStart: 0,
    debatesAmount: 9,
  });

  const { loading, data } = useQuery(getDebates, {
    variables: { ...page, debatesTag: tag },
  });
  if (loading) return <Loading />;
  return (
    <>
      <Head>
        <title>{tag}</title>
      </Head>

      <div className="md:container md:mx-auto ">
        <Body debates={data.debates} />
      </div>

      <div className="btn-group justify-center">
        {page.debatesStart > 0 && (
          <button
            className="btn btn-outline btn-wide"
            onClick={() =>
              setPage({
                ...page,
                debatesStart: page.debatesStart - 9,
                debatesAmount: page.debatesStart,
              })
            }
          >
            Previous Page
          </button>
        )}
        <button
          className="btn btn-outline btn-wide"
          onClick={() =>
            setPage({
              ...page,
              debatesStart: page.debatesAmount,
              debatesAmount: page.debatesAmount + 9,
            })
          }
        >
          Next Page
        </button>
      </div>
    </>
  );
}
