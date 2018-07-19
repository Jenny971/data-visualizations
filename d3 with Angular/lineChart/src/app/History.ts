export class History {
	date: Date;
	value: Number;
	threshold: Number;
	constructor (date, value, threshold) {
		this.date = date;
		this.value = value;
		this.threshold = threshold;
	}
}