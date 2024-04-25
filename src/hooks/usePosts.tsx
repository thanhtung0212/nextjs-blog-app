import { useState } from 'react';
import { Post } from '../graphql/__generated__/schema.graphql';

export const usePosts = () => {
  const [_posts, _setPosts] = useState<Post[]>([]);

  const setPosts = (post: Post[]) => {
    _setPosts(post);
  };
  const createPost = (post: Post) => {
    console.log('create post', post);
    _setPosts([post, ..._posts]);
  };
  const updatePosts = (posts: Post[]) => {
    _setPosts([..._posts, ...posts]);
  };

  const updatePost = (post: Post) => {
    const _post = _posts.map((p) => {
      return p.id === post.id ? { ...p, ...post } : p;
    });

    _setPosts([..._post, post]);
  };
  const deletePost = (id: string) => {
    _setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    posts: _posts,
    createPost,
    updatePosts,
    setPosts,
    updatePost,
    deletePost,
  };
};
