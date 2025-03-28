import { FC, useState, ChangeEvent, FormEvent, useCallback } from 'react';

import Warnings from '@components/Warnings/Warnings';

import { IVerifyAccount } from 'types/components/Modals/VerifyAccount/VerifyAccount';

import { setWarnings, resetWarnings } from 'oldStore/actions/app';

import {
	Button,
	Message,
	Form,
	Input,
	InputLabel,
	Submit,
	PrivateKeyLabelDiv,
	PrivateKeysList,
} from '@styles/components/Modals/ModalTemplate';
import ModalTemplate from '../ModalTemplate';
import { ToggleModalType } from 'types/components/Modals';
import { useAppDispatch, useAppSelector } from '@store/index';
import { toggleModal } from '@store/reducers/navigationBar';

const VerifyAccount: FC = () => {
	const dispatch = useAppDispatch();

	const { app } = useAppSelector((state) => state);

	const [privateKeys, setPrivateKeys] = useState<boolean>(false);

	const [username, setUsername] = useState<string>('');
	const [privateKeysArr, setPrivateKeysArr] = useState<string[]>(
		Array(12).fill('')
	);

	const [success, setSuccess] = useState<boolean>(false);

	function checkAllFields(): boolean {
		if (privateKeys) {
			for (let i = 0; i < privateKeysArr.length; i += 1) {
				if (privateKeysArr[i].length === 0) {
					return false;
				}
			}
		} else if (username.length === 0) {
			return false;
		}

		return true;
	}

	function onChangePrivateKey(
		e: ChangeEvent<HTMLInputElement>,
		index: any
	): void {
		const auxPk = [...privateKeysArr];
		auxPk[index] = e.target.value;
		setPrivateKeysArr(auxPk);
	}

	function onChangeUsername(e: ChangeEvent<HTMLInputElement>): void {
		setUsername(e.currentTarget.value);
	}

	const findUser = async (): Promise<{
		status_code: number;
		results: {};
		errors: string[];
	}> => {
		const res = await fetch(
			`${process.env.USER_API}/users/get/verify?username=${username}`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await res.json();
		return data;
	};

	const verifyPrivateKeys = async (): Promise<{
		status_code: number;
		results: {};
		errors: string[];
	}> => {
		const res = await fetch(
			`${process.env.USER_API}/users/auth/private-keys/verify`,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					privateKeys: privateKeysArr,
				}),
			}
		);
		const data = await res.json();
		return data;
	};

	const handleSubmitFindUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(resetWarnings());
		if (checkAllFields()) {
			const findUserResponse = await findUser();

			if (findUserResponse.status_code === 200) {
				setPrivateKeys(true);
			} else {
				setPrivateKeys(false);
				findUserResponse.errors.forEach((error) => {
					dispatch(setWarnings(error));
				});
			}
		}
	};

	const handleSubmitPrivateKeys = async (e) => {
		e.preventDefault();
		dispatch(resetWarnings());
		if (checkAllFields()) {
			const verifyResponse = await verifyPrivateKeys();

			if (verifyResponse.status_code === 200) {
				setSuccess(true);
				setPrivateKeysArr(Array(12).fill(''));
			} else {
				verifyResponse.errors.forEach((error) => {
					dispatch(setWarnings(error));
				});
			}
		}
	};

	const toggleLogin = useCallback(() => {
		dispatch(toggleModal({ modal: 'login' }));
	}, [dispatch]);

	return (
		<ModalTemplate
			heading="| Verify Account"
			type={privateKeys ? 'privateKeys' : 'verifyAccount'}
			allowClose
			success={success}
			successMessage="You have successfully activated your account"
		>
			{privateKeys ? (
				<>
					<div>
						<Message>
							To successfully verifiy your account you should enter all of your 24
							words private key in fields below.
						</Message>
						<PrivateKeysList>
							{privateKeysArr.map((privateKey: string, index: any) => (
								<PrivateKeyLabelDiv key={index}>
									<InputLabel htmlFor={`privateKey-${index}`}>{index + 1}</InputLabel>
									<Input
										id={`privateKey-${index}`}
										type="text"
										onChange={(e) => onChangePrivateKey(e, index)}
										value={privateKey}
									/>
								</PrivateKeyLabelDiv>
							))}
						</PrivateKeysList>
					</div>
					<div>
						<Warnings modal={false} />
						<br />
						<Submit type="button" onClick={(e) => handleSubmitPrivateKeys(e)}>
							Verify Account
						</Submit>
						<Button type="button" onClick={() => toggleLogin()}>
							Already have an account?
						</Button>
					</div>
				</>
			) : (
				<>
					<Form onSubmit={handleSubmitFindUser}>
						<div>
							<Message>
								First, look for your account by searching your username.
							</Message>
						</div>
						<div>
							<InputLabel htmlFor="username">Username</InputLabel>
							<Input
								id="username"
								type="text"
								onChange={onChangeUsername}
								value={username}
							/>
						</div>
						<Warnings modal />
						<Submit type="submit" id="verifiyAccountFindUserButton">
							Find User
						</Submit>
						<Button type="button" onClick={() => toggleLogin()}>
							Already have an account?
						</Button>
					</Form>
				</>
			)}
		</ModalTemplate>
	);
};

export default VerifyAccount;
