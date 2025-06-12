import {ActivatedRoute, RouterModule} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecommendedPortfolio } from 'src/app/core/models/customer/customer.model';
import { RecommendationPortfolio } from 'src/app/core/services/api/recommendation-portfolio.service';
import { CustomerSubTabComponent } from 'src/app/pages/admin/customer/customer-detail/customer-sub-tab.component';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { Chart } from 'chart.js';
import { Portfolio } from 'src/app/core/models/portfolio-management/portfolio-management.models';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PlannerNoteBreadcrumbComponent} from '../../../../admin/planner-notes/planner-note-breadcrumb/planner-note-breadcrumb.component';

@Component({
    selector: 'app-portfolio-recommendation-detail',
    templateUrl: './portfolio-recommendation-detail.component.html',
    styleUrls: ['./portfolio-recommendation-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        PlannerNoteBreadcrumbComponent,
        MatProgressBar,
        MatProgressBarModule
    ]
})
export class PortfolioRecommendationDetailComponent extends CustomerSubTabComponent {

	portfolioChart: any;
	detail: RecommendedPortfolio;
	GoalType = GoalTypeEnum;
	doughnutChartData: any[];
	doughnutChartLabel: any[];
	chartBackgroundColor = [
		'#538AD5', '#82C4BC', '#82C484', '#0F7763', '#EFD56A',
		'#06CBCB', '#FF9D2A', '#FF8D8D', '#BA86C1', '#FF6CF4',
		'#C48282', '#FF0000', '#9D2AFF', '#C6940D', '#A03724',
		'#A3A3A3', '#6FEF6A', '#5A565A', '#86A4C1', '#777E51'
	]

	constructor(
		protected activatedRoute: ActivatedRoute,
		protected recommendationPortfolio: RecommendationPortfolio,
		protected popupService: PopupService,
	) {
		super(activatedRoute);
	}

	getSubTab(): DetailSubTab {
		return DetailSubTab.Portfolio;
	}

	getFundGoalName(goal: Portfolio): string {
		switch (goal.goalType) {
			case GoalTypeEnum.Fund:
				return `${goal.fundName}`;
			case GoalTypeEnum.Retirement:
			case GoalTypeEnum['Home Ownership']:
			case GoalTypeEnum['Children Education']:
				return `${GoalTypeEnum[goal.goalType]}`;
			default:
				return `${goal.goalName}`;
		}
	}

	protected getFromAPI(): void {
		this.recommendationPortfolio.getRecommendationPortfolioChart().subscribe(
			(success) => {
				this.detail = success;
				this.doughnutChartData = this.detail.portfolios.map(value => value.breakdownPercentage);
				this.doughnutChartLabel = this.detail.portfolios.map(value => GoalTypeEnum[value.goalType]);

				this.getPortfolioChart();
				if (this.doughnutChartData.reduce((a, b) => a + b, 0) === 0) {
					this.createEmptyPortfolioChart();
				}
			},
			(error) => { },
		).add(() => this.isLoading = false);
	}

	getPortfolioChart(): void {
		this.portfolioChart = new Chart('portfolioChart', {
			type: 'doughnut',
			data: {
				labels: this.doughnutChartLabel,
				datasets: [{
					data: this.doughnutChartData,
					backgroundColor: this.chartBackgroundColor,
					// fill: false
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				// legend: {
				// 	display: false
				// },
			},
		})
	}

	private createEmptyPortfolioChart() {
		const chartData = this.portfolioChart.data.datasets[0];
		const chartOptions = this.portfolioChart.options;
		chartData.data = [1];
		chartData.backgroundColor = '#D2DEE2';
		chartData.borderWidth = 0;
		chartOptions.tooltips = { enabled: false };
		chartOptions.legend.onClick = null;
		this.portfolioChart.update();
	}
}
