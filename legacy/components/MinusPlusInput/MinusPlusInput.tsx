import { FC, useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import { IMinusPlusInput } from 'types/components/MinusPlusInput/MinusPlusInput';

import {
	Btn,
	InputDiv,
	Input,
	Symbol,
} from '@styles/components/MinusPlusInput/MinusPlusInput';

const MinusPlusInput: FC<IMinusPlusInput> = ({
	symbol,
	changeNumber,
	initialValue,
	step,
	min,
	max,
	buttons,
	disableInput,
	width,
	fitContent,
}) => {
	const [inputNumber, setInputNumber] = useState<number>(initialValue);

	useEffect(() => {
		setInputNumber(initialValue);
	}, [initialValue]);

	function onChangeMinusBtn(): void {
		if (inputNumber > min) {
			const auxNumber: number = inputNumber - step;
			const floatNumber: number = parseFloat(auxNumber.toFixed(2));

			setInputNumber(floatNumber);
			changeNumber(floatNumber);
		}
	}

	function onChangePlusBtn(): void {
		if (max !== undefined) {
			if (inputNumber < max) {
				const auxNumber: number = inputNumber + step;
				const floatNumber: number = parseFloat(auxNumber.toFixed(2));

				setInputNumber(floatNumber);
				changeNumber(floatNumber);
			}
		} else {
			const auxNumber: number = inputNumber + step;
			const floatNumber: number = parseFloat(auxNumber.toFixed(2));

			setInputNumber(floatNumber);
			changeNumber(floatNumber);
		}
	}

	function onChangeInput(e): void {
		setInputNumber(e.target.value);
	}

	return (
		<InputDiv fitContent={fitContent}>
			{buttons && (
				<Btn className="left" onClick={() => onChangeMinusBtn()}>
					<FaMinus />
				</Btn>
			)}
			{disableInput ? (
				<Input
					type="number"
					min="0"
					step={`${step}`}
					value={inputNumber}
					disabled
					width={width}
				/>
			) : (
				<Input
					type="number"
					min="0"
					step={`${step}`}
					value={inputNumber}
					onChange={onChangeInput}
					width={width}
				/>
			)}

			{buttons && (
				<Btn className="right" onClick={() => onChangePlusBtn()}>
					<FaPlus />
				</Btn>
			)}
			{symbol && <Symbol>{symbol}</Symbol>}
		</InputDiv>
	);
};

export default MinusPlusInput;
