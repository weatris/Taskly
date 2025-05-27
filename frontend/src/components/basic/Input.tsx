import classNames from 'classnames';
import { HTMLInputTypeAttribute, SetStateAction } from 'react';

export const Input = ({
  value = '',
  setValue,
  placeholder,
  className,
  type = 'text',
  disabled = false,
  dataTestId=''
}: {
  value?: any;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  dataTestId?: string;
}) => {
  return (
    <input
      className={classNames(
        'w-full h-[40px] rounded-lg focus:outline-none px-2',
        className,
      )}
      data-testid={dataTestId}
      placeholder={placeholder}
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
