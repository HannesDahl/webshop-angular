import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@ViewChild('dashboardChart') public dashboardChart: ElementRef

	constructor() { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		var ctx = this.dashboardChart.nativeElement.getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['January', 'Febuary', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				datasets: [{
					label: 'Sales',
					data: [50, 19, 3, 10, 25, 10, 20, 100, 80, 67, 90, 86],
					backgroundColor: [
						'rgba(75, 192, 192, 0.2)'
					],
					borderColor: [
						'rgba(75, 192, 192, 1)'
					],
					borderWidth: 1,
					pointBackgroundColor: "#4BC0C0"
				}],
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
			}
		});
	}

}
