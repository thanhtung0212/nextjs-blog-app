import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { DeletePostDocument } from '../../graphql/mutations/posts.graphql.interface'; // adjust this import according to your file structure
import PostItem from './Post'; // adjust this import according to your file structure

const mockPost = {
  id: '1',
  title: 'Test Post',
  body: 'Test Body',
};

const mocks = [
  {
    request: {
      query: DeletePostDocument,
      variables: {
        id: mockPost.id,
      },
    },
    result: {
      data: {
        deletePost: {
          id: mockPost.id,
          __typename: 'Post',
        },
      },
    },
  },
];

describe('PostItem', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostItem
          post={mockPost}
          onClick={jest.fn()}
          onDeleteSuccess={jest.fn()}
        />
      </MockedProvider>,
    );
    expect(getByText(/Test Post/i)).toBeInTheDocument();
  });
});
