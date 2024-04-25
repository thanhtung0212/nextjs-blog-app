import { Avatar, Button, Popover } from 'flowbite-react';
import { useRouter, Router } from 'next/router';
import { useAuthContext } from '../context/AuthContext';
import { logout } from '../firebase/auth';

const UserSession = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    router?.replace('/login');
    logout();
  };
  // Render
  return (
    <div className="mb-2 flex items-center mr-4">
      <b className="mr-2">{user?.displayName}</b>
      <Popover
        content={
          <Button color="light" onClick={handleLogout}>
            Log out
          </Button>
        }
      >
        <div>
          <Avatar
            id="test-flowbite-avatar-img"
            color={'red'}
            size="md"
            rounded
            status="online"
            statusPosition="top-right"
          />
        </div>
      </Popover>
    </div>
  );
};

export default UserSession;
