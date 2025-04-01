import { useScreenDetector } from '../../../utils/useScreenDetector';
import { OpenTicketModalDesktop } from './OpenTicketModalDesktop';
import { OpenTicketModalMobile } from './OpenTicketModalMobile';

export const OpenTicketModal = () => {
  const { isMediumScreen } = useScreenDetector();

  if (isMediumScreen) {
    return <OpenTicketModalMobile />;
  }

  return <OpenTicketModalDesktop />;
};
