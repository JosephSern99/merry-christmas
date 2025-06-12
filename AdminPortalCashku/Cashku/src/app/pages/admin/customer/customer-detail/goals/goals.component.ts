import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import { CustomerGoal, CustomerGoalFunds } from 'src/app/core/models/customer/customer.model';
import { CustomerService } from 'src/app/core/services/api/customer.service';
import { CustomerSubTabComponent } from 'src/app/pages/admin/customer/customer-detail/customer-sub-tab.component';
import { GoalSubPage } from 'src/app/pages/admin/customer/customer-detail/goals/goal.interface';
import { DirectDebitComponent } from './direct-debit/direct-debit.component';

@Component({
    selector: 'app-goals',
    templateUrl: './goals.component.html',
    styleUrls: ['./goals.component.scss'],
    standalone: false
})
export class GoalsComponent extends CustomerSubTabComponent {

    chartLegend: boolean = false;
    chartIsLoading = false;
    DetailSubTab = DetailSubTab;
    doughnutFundData: any[];
    doughnutFundLabel: any[];
    goalFundCall: Subscription;
    goalFundChart: Chart;
    goalFunds: CustomerGoalFunds;
    goals: CustomerGoal[] = [];
    GoalTypeEnum = GoalTypeEnum;
    math = Math;
    selectedGoal: CustomerGoal;
    selectedGoalIndex: number = 0;
    selectedTab: DetailSubTab;

    private subTab: GoalSubPage;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected apiService: CustomerService,
        protected router: Router,
    ) {
        super(activatedRoute);
    }

    getSubTab(): DetailSubTab {
        return DetailSubTab.Goals;
    }

    onGoalClick(index: number): void {
        if (index >= this.goals.length) {
            console.error('UI index is out of goal length.')
            return;
        }

        this.selectedGoalIndex = index;
        this.selectedGoal = this.goals[this.selectedGoalIndex];
        this.subTab.setCustomerGoal(this.selectedGoal);
        this.getGoalFunds(this.selectedGoal.id);
    }

    onRouterOutletActivate(subTab: GoalSubPage): void {
        if (!subTab.getSubTab() || !subTab.setCustomerID || !subTab.setCustomerGoal) {
            console.warn('Sub Tab component didn\' implement GoalSubPage in GoalsComponent!');
            return;
        }

        this.subTab = subTab;
        this.selectedTab = this.subTab.getSubTab();

        this.subTab.setCustomerID(this.customerID);
        this.subTab.setCustomerGoal(this.selectedGoal);

        if (subTab instanceof DirectDebitComponent) {
            subTab.details = this.goalFunds.directDebit;
        }
    }

    getGoalFundChart(): void {
        this.goalFundChart = new Chart('goalFundChart', {
            type: 'doughnut',
            data: {
                labels: this.doughnutFundLabel,
                datasets: [{
                    data: this.doughnutFundData,
                    backgroundColor: [...DATASET_BACKGROUND_COLORS],
                    // fill: false
                }]
            },
            options: {
                responsive: true,
                // legend: {
                //     display: false
                // },
            }
        })
    }

    getGoalFunds(goalId: number): void {
        this.chartIsLoading = true;
        this.goalFundCall && this.goalFundCall.unsubscribe();
        this.goalFundCall = this.apiService.getGoalFunds(this.customerID, goalId)
            .pipe(tap(() => this.chartIsLoading = false))
            .subscribe(
                (success: any) => {
                    this.goalFunds = success;
                    this.doughnutFundLabel = ['Amount already have'];
                    this.doughnutFundData = [this.goalFunds.initialPercentage];

                    this.doughnutFundLabel.push(...this.goalFunds.goals.flatMap(obj => [obj.fundName, `Returns ${obj.fundName}`]));
                    this.doughnutFundData.push(...this.goalFunds.goals.flatMap(value => [value.breakdownPercentage, value.returnsPercentage]));

                    this.doughnutFundData.push(this.goalFunds.remainingPercentage);

                    // https://stackoverflow.com/a/65114814
                    // DO NOT build new chart each time otherwise will have bug where hovering the cursor over chart will display previous data.
                    if (this.goalFundChart) {
                        this.goalFundChart.data.labels = this.doughnutFundLabel;
                        this.goalFundChart.data.datasets[0].data = this.doughnutFundData;
                        this.handleLastDataSet();
                        return;
                    }
                    this.getGoalFundChart();
                    this.handleLastDataSet();
                },
                (err) => { console.error('[API]', err.error); }
            );
    }

    getProgressPercentage(): number {
        if (!this.goalFunds) {
            return 0;
        }
        return Math.floor((Math.min(1, (this.goalFunds.currentTotalAmount / this.goalFunds.goalAmount)) * 100));
    }

    getReturnsPercentageCSS(): string {
        if (!this.goalFunds) {
            return '';
        }

        if (this.goalFunds.returnsPercentage > 0) {
            return 'positive-returns';
        }

        if (this.goalFunds.returnsPercentage < 0) {
            return 'negative-returns';
        }

        return '';
    }

    protected getFromAPI(): void {
        this.apiService.getGoals(this.customerID).subscribe(
            (success) => {
                this.goals = success;
                this.selectedGoalIndex = 0;

                if (this.goals.length === 0) {
                    return;
                }

                this.selectedGoal = this.goals[this.selectedGoalIndex];
                this.getGoalFunds(this.selectedGoal.id);
            },
            (error) => {
                console.error('[API]', error);
                if (error.error.statusCode === 400) {
                    this.router.navigate(['/customer']);
                }
            },
        ).add(() => this.isLoading = false);
    }

    private handleLastDataSet(): void {
        const lastIndex = this.doughnutFundData.length - 1;
        this.goalFundChart.data.datasets[0].backgroundColor = [...DATASET_BACKGROUND_COLORS];
        // this.goalFundChart.data.datasets[0].backgroundColor[lastIndex] = '#EFEFEF';
        // this.goalFundChart.options.tooltips.filter = (tooltipItem) => tooltipItem.index !== lastIndex;
        this.goalFundChart.update();
    }
}

// Each dataset will have its own unique color (breakdownPercentage) and a yellow returns section (returnsPercentage)
const DATASET_BACKGROUND_COLORS = [
    '#696969', // Amount already have dataset (initialPercentage) will be gray
    '#03A592', '#FFBC05', // FFBC05(yellow) = Returns section color
    '#0B2696', '#FFBC05',
    '#8524D1', '#FFBC05',
    '#4ACB68', '#FFBC05',
    '#F37032', '#FFBC05',
    '#3A6F90', '#FFBC05',
    '#A5005F', '#FFBC05',
    '#67A5B4', '#FFBC05',
    '#00803B', '#FFBC05',
    '#1570EB', '#FFBC05',
    '#23574B', '#FFBC05',
    '#D41CE3', '#FFBC05',
    '#1C97F2', '#FFBC05',
    '#4500FF', '#FFBC05',
];
