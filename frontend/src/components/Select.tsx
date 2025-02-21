import classNames from 'classnames';
import { inputStyle } from '../common/styles';

export const Select = ({
  options,
  initValue,
  onChange,
}: {
  options: {
    title: string;
    key: string;
  }[];
  initValue: string;
  onChange: (value: string) => void;
}) => {
  return (
    <select
      className={classNames(inputStyle, 'appearance-none')}
      value={initValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option
          key={option.key}
          className="hover:bg-green-700"
          value={option.key}
        >
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
