import { t } from 'i18next';
import { Button } from '../../../components/basic/Button';
import { AdjustmentsHorizontalIcon } from '../../../images/icons';
import { useStateProvider } from '../../../stateProvider/useStateProvider';
import classNames from 'classnames';
import { useEffect } from 'react';

export const TicketFilterButton = () => {
  const { state, actions } = useStateProvider();
  const { setShowTicketFilters } = actions;
  const { filterMarkers, filterMembers } = state.ticket;
  const { boardData } = state.board;
  const { setFilterMarkers, setFilterMembers } = actions;

  const id = boardData?.id;
  const key = `ticketFilters_${id}`;
  const isFilterUsed = !!(filterMarkers?.length || filterMembers?.length);

  useEffect(() => {
    if (!id) {
      return;
    }
    const savedRecords = localStorage.getItem(key);
    if (!savedRecords) {
      return;
    }
    const records = JSON.parse(savedRecords);
    setFilterMarkers(records.filterMarkers || []);
    setFilterMembers(records.filterMembers || []);
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    localStorage.setItem(
      key,
      JSON.stringify({
        filterMarkers,
        filterMembers,
      }),
    );
  }, [filterMarkers, filterMembers]);

  return (
    <Button
      {...{
        text: t('Board.filter'),
        variant: 'primary',
        className: classNames(isFilterUsed && 'border-green-700'),
        icon: (
          <div className="w-full h-full relative">
            <AdjustmentsHorizontalIcon />{' '}
            {isFilterUsed && (
              <div className="w-3 h-3 absolute -top-1 -right-1 bg-green-700 rounded-full" />
            )}
          </div>
        ),
        onClick: () => {
          setShowTicketFilters(true);
        },
      }}
    />
  );
};
