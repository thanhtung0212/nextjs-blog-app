import React, { createContext, useState, useContext, FC } from 'react';
import { Post } from '../graphql/__generated__/schema.graphql';

interface PostsContextData {
  posts: Post[];
  updatePost: (updatedPost: Post) => void;
  createPost: (newPost: Post) => void;
  deletePost: (id: string) => void;
  setPosts: (posts: Post[]) => void;
  updatePosts: (posts: Post[]) => void;
}

const PostsContext = createContext<PostsContextData | undefined>(undefined);

export const PostsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listPost, setListPost] = useState<Post[]>([]);

  const updatePost = (updatedPost: Post) => {
    const id = updatedPost.id;
    if (!id) return;
    setListPost((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post)),
    );
  };
  const updatePosts = (posts: Post[]) => {
    setListPost((prevPosts) => [...prevPosts, ...posts]);
  };

  const createPost = (newPost: Post) => {
    setListPost((prevPosts) => [...prevPosts, newPost]);
  };

  const deletePost = (id: string) => {
    setListPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const setPosts = (posts: Post[]) => {
    setListPost(posts);
  };

  return (
    <PostsContext.Provider
      value={{
        posts: listPost,
        updatePost,
        createPost,
        deletePost,
        setPosts,
        updatePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextData => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
