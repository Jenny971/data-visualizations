import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { History } from './History';

@Injectable()
export class ChartService {
	ruleHistory: History[] = [];

	constructor() {
		this.createDaysData(1, 90);
	}

	getHistory() {
		return this.ruleHistory;
	}

	createMockData(date, value, threshold) {
		const rulesResults = new History(date, value, threshold);
		this.ruleHistory.push(rulesResults);
	}

	createDailyData(dateRange) {
		let value = Math.floor((Math.random() * 20) + 5) + dateRange * 0.5;
		let threshold = Math.floor(dateRange / 20) * 10 + 18;
		let date = moment().subtract(dateRange, 'days').format('L');
		const saveResponse = this.createMockData(date, value, threshold);
	}

	createDaysData(startDate, endDate) {
		while (startDate <= endDate) {
			const response = this.createDailyData(endDate - startDate);
			startDate++;
		}
	}

}
