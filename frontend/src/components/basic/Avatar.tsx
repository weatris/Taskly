import { useState } from 'react';
import { userType } from '../../common/typing';
import { Stack } from './Stack/Stack';
import classNames from 'classnames';

const sizes = {
  sm: 'w-5 h-5 [&>p]:text-sm',
  md: 'w-10 h-10 [&>p]:text-xl',
};

const spacing = {
  sm: 'top-5',
  md: 'top-10',
};

export const Avatar = ({
  userData,
  size = 'md',
  placing = 'left',
  canHover = true,
}: {
  userData: userType;
  size?: 'sm' | 'md';
  placing?: 'left' | 'right';
  canHover?: boolean;
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

      {isHovered && canHover && (
        <div
          className={classNames(
            'max-w-[120px] absolute bg-white text-gray-700 text-sm z-[1] px-2 py-1 rounded border shadow-md',
            placing == 'left' ? 'right-0' : 'left-0',
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
