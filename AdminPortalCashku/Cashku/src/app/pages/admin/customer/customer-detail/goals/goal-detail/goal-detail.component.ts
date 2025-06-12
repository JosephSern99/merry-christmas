import { Component, OnInit } from '@angular/core';
import { CustomerGoal } from 'src/app/core/models/customer/customer.model';
import { DetailSubTab } from 'src/app/core/constants/detail.constants';
import { GoalSubPage } from 'src/app/pages/admin/customer/customer-detail/goals/goal.interface';
import { GoalTypeEnum } from 'src/app/core/constants/goal.constant';
import { PortfolioStatus, PortfolioType } from 'src/app/core/constants/portfolio-management.constants';

@Component({
    selector: 'app-goal-detail',
    templateUrl: './goal-detail.component.html',
    styleUrls: ['./goal-detail.component.scss'],
    standalone: false
})
export class GoalDetailComponent implements OnInit, GoalSubPage {

    goal: CustomerGoal;
    GoalType = GoalTypeEnum;
    PortfolioStatus = PortfolioStatus;
    PortfolioType = PortfolioType;

    constructor() { }

    ngOnInit(): void { }

    getSubTab(): DetailSubTab {
        return DetailSubTab.GoalDetails;
    }

    setCustomerGoal(goal: CustomerGoal): void {
        this.goal = goal;
    }

    setCustomerID(id: string): void { }

}
