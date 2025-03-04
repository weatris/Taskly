import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Stack } from './Stack/Stack';
import { useClickAway } from 'react-use';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { inputStyle } from '../../common/styles';
import { Icon } from '../../images/Icon';

export const Select = ({
  options,
  initValue,
  onChange,
  className,
  icon = <></>,
}: {
  options: {
    title: string;
    key: string;
  }[];
  initValue: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initValue);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setSelectedValue(initValue);
  }, [initValue]);

  if (!selectedValue) {
    return <></>;
  }

  return (
    <div ref={ref} className="w-full relative">
      <Stack
        className={classNames(
          inputStyle,
          'w-full h-[50px] bg-white cursor-pointer',
          className,
        )}
        direction="row"
        justifyContent="between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Stack className="w-full" direction="row" alignItems="start">
          <>{icon}</>
          <p>
            {options.find((option) => option.key === selectedValue)?.title ||
              'Select an option'}
          </p>
        </Stack>
        <Icon>
          {isOpen ? (
            <ChevronUpIcon color="gray" />
          ) : (
            <ChevronDownIcon color="gray" />
          )}
        </Icon>
      </Stack>
      {isOpen && (
        <div className="w-full absolute mt-1 bg-white rounded-md overflow-hidden border border-gray-300">
          {options.map((option) => (
            <div
              key={option.key}
              className="p-2 hover:bg-green-500 cursor-pointer"
              onClick={() => handleOptionClick(option.key)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
