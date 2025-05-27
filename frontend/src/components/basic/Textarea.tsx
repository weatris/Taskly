import classNames from 'classnames';
import { SetStateAction } from 'react';

export const Textarea = ({
  value = '',
  setValue,
  placeholder,
  className,
  disabled,
  dataTestId,
}: {
  value?: string;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dataTestId?: string;
}) => {
  return (
    <textarea
      className={classNames(
        'w-full h-[120px] resize-none rounded-lg focus:outline-none p-2 border border-gray-200',
        className,
      )}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      data-testid={dataTestId}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
