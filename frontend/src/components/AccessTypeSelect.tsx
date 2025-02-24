import { t } from 'i18next';
import { Stack } from './basic/Stack/Stack';
import { Button } from './basic/Button';
import { Dispatch, SetStateAction } from 'react';

export const AccessTypeSelect = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) => {
  const options = [
    { title: t('accessTypes.public'), key: 'public' },
    { title: t('accessTypes.private'), key: 'private' },
    { title: t('accessTypes.closed'), key: 'closed' },
  ];

  return (
    <Stack className="w-full gap-2" direction="row">
      {options.map((item) => {
        return (
          <Button
            key={item.key}
            className="w-full"
            text={item.title}
            variant={item.key == selectedOption ? 'default' : 'primary'}
            onClick={() => {
              setSelectedOption(item.key);
            }}
          />
        );
      })}
    </Stack>
  );
};
