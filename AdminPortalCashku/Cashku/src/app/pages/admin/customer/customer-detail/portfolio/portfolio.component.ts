import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CustomerPortfolio } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { CustomerSubTabComponent } from 'src/app/pages/admin/customer/customer-detail/customer-sub-tab.component';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import {Chart, ChartConfiguration} from 'chart.js';
import { Portfolio } from 'src/app/core/models/portfolio-management/portfolio-management.models';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    standalone: false
})
export class PortfolioComponent extends CustomerSubTabComponent {

    portfolioChart: Chart | null = null;
    detail: CustomerPortfolio;
    GoalType = GoalTypeEnum;
    doughnutChartData: number[] = [];
    doughnutChartLabel: string[] = [];
    chartBackgroundColor = [
        '#538AD5', '#82C4BC', '#82C484', '#0F7763', '#EFD56A',
        '#06CBCB', '#FF9D2A', '#FF8D8D', '#BA86C1', '#FF6CF4',
        '#C48282', '#FF0000', '#9D2AFF', '#C6940D', '#A03724',
        '#A3A3A3', '#6FEF6A', '#5A565A', '#86A4C1', '#777E51'
    ];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected customerApi: CustomerService,
        protected popupService: PopupService,
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        // Destroy chart to prevent memory leaks
        if (this.portfolioChart) {
            this.portfolioChart.destroy();
        }
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.Portfolio;
    }

    changeNumberToCurrency(total: number): string {
        return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    getFundGoalName(goal: Portfolio): string {
        switch(goal.goalType) {
            case GoalTypeEnum.Fund:
                return `Fund - ${goal.fundName}`;
            case GoalTypeEnum.Retirement:
            case GoalTypeEnum['Home Ownership']:
            case GoalTypeEnum['Children Education']:
                return `Goal - ${GoalTypeEnum[goal.goalType]}`;
            default:
                return `Goal - ${goal.goalName}`;
        }
    }

    protected getFromAPI(): void {
        this.customerApi.getCustomerPortfolio(this.customerID).subscribe(
            (success: any) => {
                this.detail = success;
                this.doughnutChartData = this.detail.portfolios.map(value => value.breakdownPercentage);
                this.doughnutChartLabel = this.detail.portfolios.map(value => GoalTypeEnum[value.goalType]);

                this.getPortfolioChart();
                if (this.doughnutChartData.reduce((a, b) => a + b, 0) === 0) {
                    this.createEmptyPortfolioChart();
                }
            }
        ).add(() => this.isLoading = false);
    }

    getPortfolioChart(): void {
        // Destroy existing chart if it exists
        if (this.portfolioChart) {
            this.portfolioChart.destroy();
        }

        const canvas = document.getElementById('portfolioChart') as HTMLCanvasElement;
        if (!canvas) {
            console.error('Canvas element with id "portfolioChart" not found');
            return;
        }

        const config: ChartConfiguration = {
            type: 'doughnut',
            data: {
                labels: this.doughnutChartLabel,
                datasets: [{
                    data: this.doughnutChartData,
                    backgroundColor: this.chartBackgroundColor,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        };

        this.portfolioChart = new Chart(canvas, config);
    }

    private createEmptyPortfolioChart(): void {
        if (!this.portfolioChart) return;

        // Update chart data for empty state
        this.portfolioChart.data.datasets[0].data = [1]; // Show single segment
        this.portfolioChart.data.datasets[0].backgroundColor = ['#D2DEE2'];
        this.portfolioChart.data.labels = ['No Data'];

        // Update options for empty state
        if (this.portfolioChart.options.plugins) {
            this.portfolioChart.options.plugins.tooltip = {
                enabled: false
            };
            if (this.portfolioChart.options.plugins.legend) {
                this.portfolioChart.options.plugins.legend.onClick = null;
            }
        }

        this.portfolioChart.update();
    }
}
