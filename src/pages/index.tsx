import { useQuery } from '@apollo/client';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FloatButton from '../components/FloatButton';
import Loading from '../components/Loading';
import ModalPostAndUpdatePost from '../components/ModalPostAndUpdatePost';
import PostItem from '../components/posts/Post';
import PostSkeleton from '../components/posts/PostSkeleton';
import SearchBox from '../components/SearchBox';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../graphql/__generated__/schema.graphql';
import { PostsDocument } from '../graphql/queries/posts.graphql.interface';
import { UserDocument } from '../graphql/queries/users.graphql.interface';
import { usePosts } from '../hooks/usePosts';
import { addApolloState, initializeApollo } from '../lib/apollo';
import Head from 'next/head';

interface PostsSSRPageProps {
  posts: Post[];
}
export type Mode = 'create' | 'update';

// Data is already available in the UsersList components, because it's been rehydrated.
// But we still have an access to this data via props, if needed.
const IndexPage: NextPage<PostsSSRPageProps> = ({}) => {
  let timerId: NodeJS.Timeout | number | null | undefined = null;
  const router = useRouter();
  const { user } = useAuthContext();
  const [mode, setMode] = useState<Mode>('create');
  const { posts, setPosts, createPost, updatePosts, updatePost, deletePost } =
    usePosts();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!user) router.push('/login');

  const {
    data: listPost,
    loading: isLoadingFetchPosts,
    fetchMore: fetchPosts,
  } = useQuery(PostsDocument, {
    variables: {
      paginate: {
        limit: 20,
        page: 1,
      },
    },
    onCompleted: (data) => {
      console.log('fetch list init');
      setPosts(data.posts.data);
    },
  });

  const handleOpenModal = (mode: Mode, id: string) => {
    if (mode === 'update') {
      setPostId(id);
    }
    setMode(mode);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFetchPosts = async (limit = 20, page) => {
    const _page = page + 1;
    console.log('fetch list post', page);

    try {
      const response = await fetchPosts({
        variables: { paginate: { limit: limit, page: _page } },
      });
      const posts = response.data.posts.data;
      posts.length > 0 ? setHasMore(true) : setHasMore(false);
      updatePosts(posts);
      setPage(_page);
      return posts;
    } catch (error) {
      console.error('Error occurred while fetching list of products: ', error);
    }
  };
  console.log('isLoadingFetchPosts', isLoadingFetchPosts);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchPosts({
          variables: {
            search: { q: searchTerm },
            paginate: { limit: 20, page: 1 },
          },
        });
        const listPost = data.posts.data;
        listPost.length >= 20 ? setHasMore(true) : setHasMore(false);
        setPosts(listPost);
        setPage(1 + 1);
      } catch (error) {
        console.error('Error occurred while searching products: ', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };
  const onDeleteSuccess = (id: string) => deletePost(id);

  console.log('listPost', { listPost, posts });

  return (
    <div>
      <Head>
        <title>Blog App</title>
        <meta name="description">
          Blog App - Next.js, GraphQL, Prisma, Apollo Client, TailwindCSS,
          TypeScript
        </meta>
      </Head>

      <section className="mt-4">
        <SearchBox handleChange={handleChange} />
        {isLoading || !listPost ? (
          <div className="flex flex-wrap">
            {Array.from({ length: 2 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            height={'calc(100vh - 140px)'}
            dataLength={posts.length}
            next={() => handleFetchPosts(20, page)}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="flex flex-wrap">
              {posts?.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onClick={() => handleOpenModal('update', post.id)}
                  onDeleteSuccess={onDeleteSuccess}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
        <ModalPostAndUpdatePost
          mode={mode}
          id={postId}
          openModal={openModal}
          closeModal={handleCloseModal}
          onSuccessUpdatePost={(post) => updatePost(post)}
          onSuccessCreatePost={(post) => createPost(post)}
        />
        <FloatButton
          onClick={() => {
            setMode('create');
            setOpenModal(true);
          }}
        />
      </section>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const apolloClient = initializeApollo(null, ctx);

  const { data } = await apolloClient.query({ query: UserDocument });
  return addApolloState(apolloClient, {
    props: {
      users: data.user,
    },
  });
}

export default IndexPage;
