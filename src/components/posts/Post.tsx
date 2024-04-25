import { Button } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import { GrEdit } from 'react-icons/gr';
import { GoTrash } from 'react-icons/go';
import { Post } from '../../graphql/__generated__/schema.graphql';
import { Popover } from 'flowbite-react';
import { useMutation } from '@apollo/client';
import { DeletePostDocument } from '../../graphql/mutations/posts.graphql.interface';
import { toast } from 'react-toastify';
import { FC, useState } from 'react';

interface PostItemProps {
  post: Post;
  onClick: (id: string) => void;
  onDeleteSuccess: (id: string) => void;
}
const PostItem: FC<PostItemProps> = ({ post, onClick, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const [deletePost, { loading: isLoadingDeletePost }] =
    useMutation(DeletePostDocument);

  const handleDeletePost = async (id: string) => {
    if (!id) return;
    try {
      await deletePost({ variables: { id } });
      onDeleteSuccess(id);
      toast.success(`Post ${id} deleted successfully`);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setOpen(false);
  if (!post) return null;
  /* Render */
  return (
    <div className="p-3 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 relative max-h-[400px]">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full flex flex-col justify-between">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-40">
            {post.body}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="">
            <Button className="w-full" onClick={() => onClick(post.id!)}>
              <GrEdit size={20} />
            </Button>
          </div>
          <div className="">
            <Popover
              open={open}
              placement="top"
              content={
                <div className="p-3">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                    Are you sure you want to delete this post?
                  </h3>
                  <div className="flex justify-end mt-4">
                    <Button
                      size="xs"
                      color="failure"
                      isProcessing={isLoadingDeletePost}
                      processingSpinner={
                        <AiOutlineLoading className="h-5 w-5 animate-spin" />
                      }
                      onClick={() => handleDeletePost(post.id!)}
                      className="mr-2"
                    >
                      Yes
                    </Button>
                    <Button size="xs" color="light" onClick={handleClose}>
                      No
                    </Button>
                  </div>
                </div>
              }
            >
              <Button
                id="btn-delete-post"
                className="w-full"
                color="failure"
                onClick={() => setOpen(true)}
              >
                <GoTrash size={20} />
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
