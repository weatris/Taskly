import classNames from 'classnames';
import { SetStateAction } from 'react';

export const Textarea = ({
  value = '',
  setValue,
  placeholder,
  className,
  disabled,
}: {
  value?: string;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <textarea
      className={classNames(
        'w-full h-[120px] resize-none rounded-lg focus:outline-none px-2',
        className,
      )}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
