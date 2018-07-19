import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { ChartService } from '../chart.service';
import { History } from '../History';

@Component({
	selector: 'app-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

	width: number = 700;
	height: number = 400;

	padding = { top: 10, right: 70, bottom: 70, left: 70 };
	ruleHistory: History[];

	constructor(private chartService: ChartService) {
		this.ruleHistory = this.chartService.getHistory();
	}

	ngAfterContentInit() {
		const svg = d3.select('#history')
			.append('svg')
			.attr('width', this.width)
			.attr('height', this.height);

		const minDate = d3.min(this.ruleHistory, d => d.date);
		const maxDate = d3.max(this.ruleHistory, d => d.date);
		const maxVaule = d3.max(this.ruleHistory, d => d.value);

		const xScale = d3.scaleTime()
			.domain([new Date(minDate), new Date(maxDate)])
			.range([0, this.width - this.padding.left - this.padding.right]);

		const yScale = d3.scaleLinear()
			.domain([0, maxVaule * 1.2])
			.range([this.height - this.padding.bottom - this.padding.top, 0]);

		const lineHistory = d3.line()
			// .curve(d3.curveBasis)
			.x(d => xScale(new Date(d.date)))
			.y(d => yScale(d.value));

		const lineThreshold = d3.line()
			// .curve(d3.curveBasis)
			.x(d => xScale(new Date(d.date)))
			.y(d => yScale(d.threshold));

		const translateX = `translate(${this.padding.left},${this.height - this.padding.bottom})`;
		const translateY = `translate(${this.padding.left},${this.padding.top})`;

		svg.append('g')
			.attr('transform', translateX)
			.call(d3.axisBottom(xScale));

		svg.append('g')
			.attr('transform', translateY)
			.call(d3.axisLeft(yScale));

		svg.append('path')
			.attr('transform', translateY)
			.attr('d', d => lineHistory(this.ruleHistory))
			.attr('fill', 'none')
			.attr('stroke', '#428bca')
			.style("stroke-width", 2);

		svg.append('path')
			.attr('transform', translateY)
			.attr('d', d => lineThreshold(this.ruleHistory))
			.attr('fill', 'none')
			.attr('stroke', '#f04f28')
			.style("stroke-width", 2);

		// Add legend
		const legendRectSize = 18;
		const legendSpacing = 4;
		const label = ['value', 'threshold'];
		const color = d3.scaleOrdinal()
			.domain(label)
			.range(['#428bca', '#f04f28']);

		const legend = svg.selectAll('.legend')
			.data(label)
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', (d, i) => {
				var height = legendRectSize + legendSpacing;
				var offset = this.width - this.padding.left - this.padding.right - legendRectSize;
				var vert = i * height + this.padding.top * 2;
				return 'translate(' + offset + ',' + vert + ')';
			});

		legend.append('rect')
			.attr('width', legendRectSize)
			.attr('height', legendRectSize)
			.style('fill', color)
			.style('stroke', color);

		legend.append('text')
			.attr('x', legendRectSize + legendSpacing)
			.attr('y', legendRectSize - legendSpacing)
			.text(function (d) { return d; });

		// Add tooltips
		const tooltip = d3.select("#history")
			.append("div")
			.attr("class", "tooltip")
			.style("opacity", 1);

		tooltip.append('div')
			.attr('class', 'label');
		tooltip.append('div')
			.attr('class', 'value');
		tooltip.append('div')
			.attr('class', 'date');

		// Add the scatterplot
		svg.selectAll(".dot")
			.data(this.ruleHistory)
			.enter()
			.append("circle")
			.attr('class', 'dot')
			.attr('transform', translateY)
			.attr("stroke", "steelblue")
			.attr("fill", "steelblue")
			.attr("r", 1.5)
			.attr("cx", d => xScale(new Date(d.date)))
			.attr("cy", d => yScale(d.value))
			.on("mouseover", (d) => {
				tooltip.style('display', 'block');
				// tooltip.select('.label').html('value');
				tooltip.select('.value').html(`value: ${d.value}`);
				tooltip.select('.date').html(d.date);
			})
			.on('mousemove', (d) => {
				tooltip.style('top', (d3.event.layerY + 10) + 'px')
					.style('left', (d3.event.layerX + 10) + 'px')
			})
			.on("mouseout", () => {
				tooltip.style('display', 'none');
			});
	}

	ngOnInit() {
	}

}
