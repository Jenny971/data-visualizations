import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { ChartService } from '../chart.service';
import { History } from '../History';

@Component({
  selector: 'app-difference-chart',
  templateUrl: './difference-chart.component.html',
  styleUrls: ['./difference-chart.component.css']
})
export class DifferenceChartComponent implements OnInit {

	width: number = 700;
	height: number = 400;

	padding = { top: 10, right: 70, bottom: 70, left: 70 };
	ruleHistory: History[];

	constructor(private chartService: ChartService) {
		this.ruleHistory = this.chartService.getHistory();
	}

	ngAfterContentInit() {
		const svg = d3.select('#differenceChart')
			.append('svg')
			.attr('width', this.width)
			.attr('height', this.height);

		const maxVaule = d3.max(this.ruleHistory, d => d.value);

		const xScale = d3.scaleTime()
			.domain(d3.extent(this.ruleHistory, d => new Date(d.date)))
			.range([0, this.width - this.padding.left - this.padding.right]);

		const yScale = d3.scaleLinear()
			.domain([0, maxVaule * 1.2])
			.range([this.height - this.padding.bottom - this.padding.top, 0]);

		const lineHistory = d3.line()
			.x(d => xScale(new Date(d.date)))
			.y(d => yScale(d.value));

		const lineThreshold = d3.line()
			.x(d => xScale(new Date(d.date)))
			.y(d => yScale(d.threshold));

		// Add area
		var area = d3.area()
			.x(d => xScale(new Date(d.date)))
			.y1(d => yScale(d.threshold))

		const translateX = `translate(${this.padding.left},${this.height - this.padding.bottom})`;
		const translateY = `translate(${this.padding.left},${this.padding.top})`;

		svg.datum(this.ruleHistory);

		svg.append('clipPath')
			.attr('id', 'clip-above')
			.append('path')
			.attr('d', area.y0(0));

		svg.append('clipPath')
			.attr('id', 'clip-below')
			.append('path')
			.attr('d', area.y0(this.height - this.padding.bottom - this.padding.top));

		svg.append('path')
			.attr('class', 'area above')
			.attr('transform', translateY)
			.attr('clip-path', 'url(#clip-above)')
			.attr('d', area.y0(d => yScale(d.value)));

		svg.append('path')
			.attr('class', 'area below')
			.attr('transform', translateY)
			.attr('clip-path', 'url(#clip-below)')
			.attr('d', area.y0(d => yScale(d.value)));

		svg.append('path')
			.attr('transform', translateY)
			.attr('d', d => lineHistory(this.ruleHistory))
			.attr('fill', 'none')
			.style('stroke', '#000')
			.style("stroke-width", 0.5);

		svg.append('path')
			.attr('transform', translateY)
			.attr('d', d => lineThreshold(this.ruleHistory))
			.attr('fill', 'none')
			.attr('stroke', '#f04f28')
			.style("stroke-width", 2)

		svg.append('g')
			.attr('transform', translateX)
			.call(d3.axisBottom(xScale));

		svg.append('g')
			.attr('transform', translateY)
			.call(d3.axisLeft(yScale));

	}

  ngOnInit() {
  }

}
