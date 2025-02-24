import { t } from 'i18next';
import { Modal } from '../../../components/basic/Modal';
import { MembersItem } from '../../BoardSettings/Members/MembersItem';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import { permissionLevels } from '../../../common/typing';
import { Dispatch, SetStateAction, useState } from 'react';
import { Stack } from '../../../components/basic/Stack/Stack';
import { Checkbox } from '../../../components/basic/Checkbox';

export const ManageMembersModal = ({
  showMembersModal,
  setShowMembersModal,
  editTicketMembers,
}: {
  showMembersModal: boolean;
  setShowMembersModal: Dispatch<SetStateAction<boolean>>;
  editTicketMembers: (newValue: string[]) => void;
}) => {
  const { state } = useStateProvider();
  const { boardData, openTicketData } = state.board;
  const [selectedMembers, setSelectedMembers] = useState(
    openTicketData?.assignedTo || [],
  );

  const handleSelect = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((item) => item !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const onSubmit = () => {
    editTicketMembers(selectedMembers);
  };

  const membersSorted = [...(boardData?.members || [])].sort(
    (a, b) =>
      permissionLevels.indexOf(b.level) - permissionLevels.indexOf(a.level),
  );

  return (
    <Modal
      {...{
        title: t('Tickets.manageMembers'),
        isVisible: showMembersModal,
        onClose: () => {
          setShowMembersModal(false);
        },
        onAccept: onSubmit,
      }}
    >
      <Stack className="w-full h-[50px] gap-5 p-2" direction="col">
        {membersSorted.map((item) => (
          <Stack className="w-full gap-2" direction="row">
            <Checkbox
              {...{
                value: selectedMembers.includes(item.id),
                onClick: () => {
                  handleSelect(item.id);
                },
              }}
            />
            <Stack
              key={item.id}
              className="w-full h-[50px] relative p-2 pt-3 border"
              direction="row"
              justifyContent="between"
            >
              {item.name}
              <p className="absolute left-[-4px] top-[-12px] px-1 bg-gray-100 border rounded-lg">
                {item.level}
              </p>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Modal>
  );
};
