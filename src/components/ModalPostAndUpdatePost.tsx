import { useMutation, useQuery } from '@apollo/client';
import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Post } from '../graphql/__generated__/schema.graphql';
import {
  CreatePostDocument,
  UpdatePostDocument,
} from '../graphql/mutations/posts.graphql.interface';
import { PostDocument } from '../graphql/queries/posts.graphql.interface';
import { Mode } from '../pages';

interface ModalPostAndUpdatePostProps {
  mode?: Mode;
  id?: string;
  openModal: boolean;
  closeModal: () => void;
  onSuccessUpdatePost: (post: Post) => void;
  onSuccessCreatePost: (post: Post) => void;
}
interface FormData {
  title: string;
  body: string;
}
const ModalPostAndUpdatePost: FC<ModalPostAndUpdatePostProps> = ({
  mode,
  id,
  openModal,
  closeModal,
  onSuccessUpdatePost,
  onSuccessCreatePost,
}) => {
  const isEdit = mode === 'update';

  const [formData, setFormData] = useState<FormData>({
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
  }>({
    title: '',
    body: '',
  });
  const { loading } = useQuery(PostDocument, {
    variables: {
      id: id as string,
    },
    skip: !isEdit || !id,
    onCompleted: (data) => {
      setFormData({
        title: data.post?.title as string,
        body: data.post?.body as string,
      });
    },
  });

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.body) {
      newErrors.body = 'Body is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleOnChange = (key: 'title' | 'body', value: string) =>
    setFormData({
      ...formData,
      [key]: value,
    });

  const [handleUpdatePost, { loading: isLoadingUpdatePost }] = useMutation(
    UpdatePostDocument,
    {
      variables: {
        id: id as string,
        input: {
          ...formData,
        },
      },
    },
  );
  const [createPost, { loading: isLoadingCreatePost }] =
    useMutation(CreatePostDocument);

  const clearForm = () => {
    setFormData({
      title: '',
      body: '',
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid || (isEdit && !id)) {
      clearForm();
      closeModal();
      return;
    }
    console.log('submit', formData);
    try {
      try {
        if (isEdit) {
          await handleUpdatePost({ variables: { id: id!, input: formData } });
          onSuccessUpdatePost({ id, ...formData });
          toast.success(`Post ${id} updated successfully`);
          console.log('update post');
        } else {
          const { data } = await createPost({ variables: { input: formData } });
          onSuccessCreatePost(data?.createPost!);
          toast.success(`Post created successfully`);
          console.log('create post', data?.createPost!);
        }
        clearForm();
        closeModal();
      } catch (error) {
        console.error('Error occurred while creating/updating a post: ', error);
      }
    } catch (error) {
      console.error('Error occurred while creating a post: ', error);
    }
  };

  /* Render */
  return (
    <Modal
      show={openModal}
      size="xl"
      popup
      position="top-center"
      onClose={() => {
        clearForm();
        closeModal();
      }}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
            {isEdit ? 'Update Post ' + id : 'Create A New Post'}
          </h3>
          {loading ? (
            <Skeleton />
          ) : (
            <form>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="Your title"
                value={formData.title}
                onChange={(event) =>
                  handleOnChange('title', event.target.value)
                }
                required
              />
              {errors.title && (
                <span style={{ color: 'red', fontSize: 14 }}>
                  {errors.title}
                </span>
              )}
              <div className="mt-3">
                <div className="mb-2 block">
                  <Label htmlFor="body" value="Body" />
                </div>
                <Textarea
                  rows={4}
                  value={formData.body}
                  id="body"
                  placeholder="Your body"
                  required
                  onChange={(event) =>
                    handleOnChange('body', event.target.value)
                  }
                />
                {errors.body && (
                  <span style={{ color: 'red', fontSize: 14 }}>
                    {errors.body}
                  </span>
                )}
              </div>

              <div className="w-full flex justify-center mt-3">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  isProcessing={isLoadingCreatePost || isLoadingUpdatePost}
                >
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Skeleton = () => (
  <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default ModalPostAndUpdatePost;
