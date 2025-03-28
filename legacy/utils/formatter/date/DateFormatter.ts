class Formatter {
	private parts: any;

	private months: string[];

	private dateFormatted: Date;

	parseDate(input: string): Date {
		this.parts = input.match(/(\d+)/g);
		return new Date(this.parts[0], this.parts[1] - 1, this.parts[2]);
	}

	formatDateFullDate(uploadedOn: string): string {
		this.dateFormatted = this.parseDate(uploadedOn);
		this.months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		return `${
			this.months[this.dateFormatted.getMonth()]
		} ${this.dateFormatted.getDate()}, ${this.dateFormatted.getFullYear()}`;
	}

	formatDateMonthOnly(uploadedOn: string): string {
		this.dateFormatted = this.parseDate(uploadedOn);
		this.months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		return `${
			this.months[this.dateFormatted.getMonth()]
		} ${this.dateFormatted.getFullYear()}`;
	}
}

export default Formatter;
