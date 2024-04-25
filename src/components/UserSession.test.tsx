import { render } from '@testing-library/react';
import UserSession from './UserSession'; // adjust this import according to your file structure
jest.mock('next/router', () => ({ replace: jest.fn() }));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({
    user: {
      displayName: 'test',
    },
  }),
}));

describe('UserSession', () => {
  it('renders correctly', () => {
    const { getByText } = render(<UserSession />);
    expect(getByText(/test/i)).toBeInTheDocument();
  });
});
