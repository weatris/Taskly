import classNames from 'classnames';
import { SetStateAction } from 'react';

export const Input = ({
  value = '',
  setValue,
  placeholder,
  className,
}: {
  value?: string;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <input
      className={classNames(
        'w-full h-full rounded-lg focus:outline-none px-2',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
