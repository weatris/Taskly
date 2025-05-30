import { t } from 'i18next';
import { Stack } from '../../components/basic/Stack/Stack';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Button } from '../../components/basic/Button';
import { Input } from '../../components/basic/Input';

export const ButtonInputForm = ({
  onAccept,
  initValue = '',
  text = t('common.create'),
  clearOnClickAway = false,
  dataTestId
}: {
  onAccept: (name: string) => void;
  initValue?: string;
  text?: string;
  clearOnClickAway?: boolean;
  dataTestId?: string;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(initValue);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setShowForm(false);
    if (clearOnClickAway) {
      setValue(initValue);
    }
  });

  if (showForm) {
    return (
      <div
        ref={ref}
        className="w-[260px] min-w-[260px] h-[40px] flex flex-row border rounded-lg shadow-md"
      >
        <Input
          {...{
            value,
            setValue,
            className: 'h-full',
            placeholder: t('common.ButtonInputForm'),
            dataTestId: `${dataTestId}_formInput`
          }}
        />
        {!!value && (
          <Button
            className="h-[40px] px-0 py-0"
            dataTestId={`${dataTestId}_formSubmitBtn`}
            text={'+'}
            onClick={() => {
              setValue('');
              onAccept(value);
              setShowForm(false);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <Stack
      className="w-[260px] min-w-[260px] h-[40px] min-h-[40px] text-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md px-2 gap-2"
      dataTestId={`${dataTestId}_formShowBtn`}
      direction="row"
      justifyContent="center"
      onClick={() => {
        setShowForm(!showForm);
      }}
    >
      <p>{text}</p>
    </Stack>
  );
};
