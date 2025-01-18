import classNames from 'classnames';
import { HTMLInputTypeAttribute, SetStateAction } from 'react';

export const Input = ({
  value = '',
  setValue,
  placeholder,
  className,
  type = 'text',
}: {
  value?: any;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
}) => {
  return (
    <input
      className={classNames(
        'w-full h-[40px] rounded-lg focus:outline-none px-2',
        className,
      )}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
