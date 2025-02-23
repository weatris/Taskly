import { SetStateAction, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Stack } from './Stack/Stack';
import { Input } from './Input';
import { Button } from './Button';
import classNames from 'classnames';
import { Icon } from '../images/Icon';
import { Spinner } from './Spinner';
import { PencilIcon } from '../images/icons';
import { defaultTextStyle } from '../common/styles';

export const EditableName = ({
  onClickAway,
  value,
  initValue,
  setValue,
  isLoading,
  className,
  isEditable = true,
}: {
  onClickAway: () => void;
  value?: string;
  initValue?: string;
  setValue: (value: SetStateAction<string>) => void;
  isLoading?: boolean;
  className?: string;
  isEditable?: boolean;
}) => {
  const [showEditName, setShowEditName] = useState(false);
  const ref = useRef(null);

  const onSave = () => {
    setShowEditName(false);
    onClickAway();
  };

  useClickAway(ref, () => {
    !isLoading && showEditName && onSave();
  });

  return (
    <div
      ref={ref}
      className={classNames(
        'w-[260px] h-[40px] flex flex-row items-center bg-gray-200 rounded-lg border shadow-md gap-2',
        className,
      )}
    >
      {showEditName && isEditable ? (
        <Stack className="w-full h-full gap-1">
          <Input {...{ value, setValue }} />
          {value !== initValue && (
            <Button
              {...{
                text: '+',
                className: 'px-0',
                onClick: () => {
                  onSave();
                },
              }}
            />
          )}
        </Stack>
      ) : (
        <Stack
          className="w-full px-2"
          direction="row"
          alignItems="center"
          justifyContent="between"
        >
          <p
            className={classNames(
              defaultTextStyle,
              'leading-[40px]',
              isLoading && 'invisible',
            )}
          >
            {initValue}
          </p>
          {isEditable && (
            <Icon
              size="md"
              onClick={() => {
                setShowEditName(true);
              }}
            >
              {isLoading ? <Spinner /> : <PencilIcon color="gray" />}
            </Icon>
          )}
        </Stack>
      )}
    </div>
  );
};
