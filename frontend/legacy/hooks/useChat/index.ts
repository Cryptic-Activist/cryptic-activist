import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createChat as createChatThunk } from '@store/thunks/chat';
import { CreateChatParams, UseChatParam } from './types';

const useChat = (isOngoing?: UseChatParam) => {
	const dispatch = useAppDispatch();
	const { chat } = useAppSelector((state) => state);

	const createChat = (params: CreateChatParams) => {
		dispatch(createChatThunk(params));
	};

	// useEffect(() => {
	// 	if (trade.data && !isOngoing) {
	// 		dispatch(createChatThunk({ tradeId: trade.data.id }));
	// 	} else if (trade.data && isOngoing) {
	// 	}
	// }, [trade.data, isOngoing]);

	return { chat, createChat };
};

export default useChat;
