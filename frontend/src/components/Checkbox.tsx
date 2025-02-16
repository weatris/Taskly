import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Stack from './Stack/Stack';
import { Icon } from '../images/Icon';
import { CheckIcon } from '../images/icons';

export const Checkbox = ({
  value = false,
  onClick,
}: {
  value?: boolean;
  onClick: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <Stack
      className={classNames(
        'min-w-[30px] min-h-[30px] border-gray-200 rounded-lg border',
        isChecked && 'bg-green-600',
      )}
      onClick={() => {
        setIsChecked((prev) => !prev);
        onClick();
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        size="md"
        className={classNames(
          isChecked ? 'hover:bg-green-700' : 'hover:bg-gray-100',
        )}
      >
        <CheckIcon color={isChecked ? 'white' : 'gray'} />
      </Icon>
    </Stack>
  );
};
