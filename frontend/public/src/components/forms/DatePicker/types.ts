export type DatePickerProps = {
	selectedDate: Date | undefined;
	label?: string;
	placeholder?: string;
	onSelect: (date: Date | undefined) => void;
};
