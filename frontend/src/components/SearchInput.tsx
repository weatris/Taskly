import { useEffect, useState } from 'react';
import { Icon } from '../images/Icon';
import { MagnifyingGlassIcon, XMarkIcon } from '../images/icons';
import { Stack } from './basic/Stack/Stack';
import classNames from 'classnames';

export const SearchInput = ({
  value,
  setValue,
  className,
  debounce = false,
  debounceTime = 300,
}: {
  value: string;
  setValue?: (value: string) => void;
  className?: string;
  debounce?: boolean;
  debounceTime?: number;
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!debounce) {
      setValue?.(inputValue);
      return;
    }

    const handler = setTimeout(() => {
      setValue?.(inputValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, debounce, debounceTime, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Stack
      className={classNames(
        'w-[250px] h-[40px] pr-[40px] rounded-lg relative border border-gray-100',
        isFocused && 'border-gray-300',
        className,
      )}
    >
      <div className="w-full h-full">
        <input
          className="w-full h-full rounded-lg indent-2 focus:border-none focus:outline-none"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </div>
      <Icon
        className="absolute right-1"
        hoverable={!!value}
        onClick={() => {
          if (value) {
            setInputValue('');
          }
        }}
      >
        {!!value ? (
          <XMarkIcon color="gray" />
        ) : (
          <MagnifyingGlassIcon color="gray" />
        )}
      </Icon>
    </Stack>
  );
};
