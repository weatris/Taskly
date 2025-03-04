import classNames from 'classnames';
import DatePickerLibrary, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = (props: DatePickerProps) => {
  return (
    <DatePickerLibrary
      dateFormat="dd/MM/yyyy"
      portalId="root-portal"
      isClearable={!!props.selected && !props.disabled}
      {...props}
      className={classNames(
        'w-full h-[40px] z-[2] border border-gray-200 p-1 indent-1',
        props.className,
      )}
    />
  );
};
