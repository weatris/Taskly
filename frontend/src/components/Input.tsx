import { SetStateAction } from 'react';

export const Input = ({
  value = '',
  setValue,
  placeholder,
}: {
  value?: string;
  setValue: (value: SetStateAction<string>) => void;
  placeholder?: string;
}) => {
  return (
    <input
      className="w-full h-full rounded-lg focus:outline-none px-2"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
