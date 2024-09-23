import classNames from "classnames";
import { inputStyle } from "../common/styles";

export const Select = ({ options, onChange }: {
  options: {
    title: string;
    key: string;
  }[];
  onChange: (value: string) => void;
}) => {
  return (
    <select
      className={classNames(inputStyle, 'appearance-none')}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option className="hover:bg-green-700" key={option.key} value={option.key}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
