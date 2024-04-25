import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="p-3 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 relative min-h-[300px]">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full flex flex-col justify-between min-h-[300]">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-full  w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded-full  max-w-[480px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full  max-w-[440px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full  max-w-[460px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full  max-w-[360px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
