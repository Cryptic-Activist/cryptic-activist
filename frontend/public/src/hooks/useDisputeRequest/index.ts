import { disputeRequestResolver } from './zod';
import { getDisputeTypes } from '@/services/trade';
import { getSocket } from '@/services/socket';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useTrade from '../useTrade';
import useUser from '../useUser';

const useDisputeRequest = () => {
  const { trade } = useTrade();
  const { user } = useUser();

  const { register, handleSubmit } = useForm({
    resolver: disputeRequestResolver,
  });

  const submitDisputeRequest = (data: any) => {
    console.log({ data });
    const socket = getSocket();
    if (socket.connected && trade.chat?.id && user.id) {
      const from = user.id;
      const to =
        trade.vendor?.id === user.id ? trade.trader?.id : trade.vendor?.id;

      socket.emit('trade_set_disputed', {
        chatId: trade.chat.id,
        type: data.type,
        reason: data.reason,
        from,
        to,
      });
    }
  };

  const disputeTypesQuery = useQuery({
    queryKey: ['disputeTypes'],
    queryFn: getDisputeTypes,
    enabled: !!trade.id,
  });

  return { submitDisputeRequest, register, handleSubmit, disputeTypesQuery };
};

export default useDisputeRequest;
