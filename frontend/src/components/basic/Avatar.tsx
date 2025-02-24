import { useState } from 'react';
import { userType } from '../../common/typing';
import { Stack } from './Stack/Stack';
import classNames from 'classnames';

const sizes = {
  sm: 'w-4 h-4 [&>p]:text-sm',
  md: 'w-10 h-10 [&>p]:text-xl',
};

const spacing = {
  sm: 'top-4',
  md: 'top-10',
};

export const Avatar = ({
  userData,
  size = 'md',
}: {
  userData: userType;
  size?: 'sm' | 'md';
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack
        className={classNames(
          'bg-gray-100 border border-gray-400 rounded-full cursor-pointer',
          sizes[size],
        )}
      >
        <p className="mx-auto select-none">
          {userData.name.charAt(0).toUpperCase()}
        </p>
      </Stack>

      {isHovered && (
        <div
          className={classNames(
            'max-w-[120px] absolute right-0 bg-white text-gray-700 text-sm px-2 py-1 rounded shadow-md',
            spacing[size],
          )}
        >
          <p className="w-full truncate">{userData.name}</p>
          <p className="w-full truncate text-xs text-gray-500">
            {userData.email}
          </p>
        </div>
      )}
    </div>
  );
};
