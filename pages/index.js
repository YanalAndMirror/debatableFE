import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Body from '../components/Body/Body';
import Header from '../components/Header';
import { getDebates } from '../providers/apollo/queries';
import { Tab } from '@headlessui/react';
import { ImSearch } from 'react-icons/im';
import Head from 'next/head';
import Loading from '../components/Loading';
export default function Home() {
  const [page, setPage] = useState({
    debatesStart: 0,
    debatesAmount: 9,
    debatesOrder: 'hot',
  });
  const [query, setQuery] = useState('');

  const { loading, data } = useQuery(getDebates, {
    variables: page,
  });

  if (loading) return <Loading />;
  return (
    <>
      <Header />
      <Head>
        <title>Debatable</title>
      </Head>
      <div className="md:container md:mx-auto ">
        <div className="justify-between flex">
          <div className="tabs ml-32">
            <Tab.Group>
              <Tab.List>
                <span
                  onClick={() =>
                    setPage({
                      debatesStart: 0,
                      debatesAmount: 9,
                      debatesOrder: 'hot',
                    })
                  }
                >
                  <Tab
                    className={
                      page.debatesOrder === 'hot'
                        ? 'tab tab-bordered tab-active'
                        : 'tab tab-bordered'
                    }
                  >
                    Featured
                  </Tab>
                </span>
                <span
                  onClick={() =>
                    setPage({
                      debatesStart: 0,
                      debatesAmount: 9,
                      debatesOrder: 'popularity',
                    })
                  }
                >
                  <Tab
                    className={
                      page.debatesOrder === 'popularity'
                        ? 'tab tab-bordered tab-active'
                        : 'tab tab-bordered'
                    }
                  >
                    Popular
                  </Tab>
                </span>
                <span
                  onClick={() =>
                    setPage({
                      debatesStart: 0,
                      debatesAmount: 9,
                      debatesOrder: 'new',
                    })
                  }
                >
                  <Tab
                    className={
                      page.debatesOrder === 'new'
                        ? 'tab tab-bordered tab-active'
                        : 'tab tab-bordered'
                    }
                  >
                    New
                  </Tab>
                </span>
              </Tab.List>
            </Tab.Group>
          </div>
          {/* search  */}
          <div class="form-control mr-28">
            <div class="relative">
              <input
                type="text"
                placeholder="Search"
                class="w-full pr-16 input input-bordered"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                class="absolute top-0 right-0 rounded-l-none btn"
                onClick={() => setPage({ ...page, debatesKeyword: query })}
              >
                <ImSearch />{' '}
              </button>
            </div>
          </div>
          {/* end search */}
        </div>

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
