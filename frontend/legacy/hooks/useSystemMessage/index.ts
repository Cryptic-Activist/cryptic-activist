import { CHAT_API } from '@constants/envs';
import { fetchPost } from '@services/axios';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getAuthToken } from '@utils/localStorage';

import { SendSystemMessage } from './types';

const useSystemMessage = () => {
	const dispatch = useAppDispatch();
	const { systemMessages } = useAppSelector((state) => state);

	const sendSystemMessage = async (data: SendSystemMessage) => {
		const response = await fetchPost(
			`${CHAT_API}/system-messages/create`,
			data,
			{ Authorization: getAuthToken() }
		);

		if (response.status !== 201) {
			return false;
		}

		return true;
	};

	return { sendSystemMessage };
};

export default useSystemMessage;
