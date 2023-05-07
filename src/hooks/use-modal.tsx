import { ModalProps } from '@oreo-ui/web';

import { useConnectContext } from '../components/provider/provider-context';

export const useModal = () => {
  const { connect, close } = useConnectContext();

  const show = (props: ModalProps) => {
    connect();
  };

  const hide = () => {
    close();
  };

  return { show, hide };
};
