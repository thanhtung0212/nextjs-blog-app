import { Button, Popover } from 'flowbite-react';
import React, { FC } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';

interface PopoverDeletePostProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoadingDeletePost: boolean;
  handleDeletePost: (id: string) => void;
  handleClose: () => void;
  postId: string;
}

const PopoverDeletePost: FC<PopoverDeletePostProps> = ({
  open,
  setOpen,
  isLoadingDeletePost,
  handleDeletePost,
  handleClose,
  postId,
}) => {
  return (
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
              onClick={() => handleDeletePost(postId)}
              className="mr-2"
              id="delete-post-button"
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
        id="delete-button"
        className="w-full"
        color="failure"
        onClick={() => setOpen(true)}
      >
        <GoTrash size={20} />
      </Button>
    </Popover>
  );
};

export default PopoverDeletePost;
