export const roundDecimals = (number: number) => {
	return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const toFixed = (number: number, decimals: number) => {
	return parseFloat(number.toFixed(decimals));
};

export const increaseValueByPercent = (value: number, percent: number) => {
	console.log(value, percent);
};
