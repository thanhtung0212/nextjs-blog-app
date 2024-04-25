import { ChangeEvent } from 'react';
import UserSession from './UserSession';

const SearchBox = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="mb-4 flex justify-between  sticky bg-white px-5 pb-5 shadow-md top-0 z-10">
      <div className="flex items-center w-1/2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
          Search:{' '}
        </h3>
        <input
          type="text"
          id="search"
          className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Input something..."
          onChange={handleChange}
        />
      </div>
      <UserSession />
    </div>
  );
};

export default SearchBox;
