import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioInformation } from 'src/app/core/models/planner-note/planner-note.model';
import { BaseApiService } from 'src/app/pages/admin/listing-popup/base-api.service';
import { RecommendedPortfolio } from 'src/app/core/models/customer/customer.model';

@Injectable({
    providedIn: 'root'
})
export class RecommendationPortfolio extends BaseApiService {

    constructor(
        protected http: HttpClient,
    ) {
        super(http);

        // Due to JS class limitation, we need to run this at child class.
        this.manualConstructor();
    }

    getRecommendationPortfolio(): Observable<PortfolioInformation[]> {
        const portfolioInformation: PortfolioInformation[] = [
            { index: 1, portfolio: "Portfolio 1", riskType: "Conservative", status: "sent" },
            { index: 2, portfolio: "Portfolio 2", riskType: "Moderate", status: "Accepted" },
            { index: 3, portfolio: "Portfolio 3", riskType: "Aggressive", status: "Rejected" },
            { index: 4, portfolio: "Custom Portfolio 1", riskType: null, status: "Rejected" }
        ];
        return of(portfolioInformation);
    }

    getRecommendationPortfolioChart(): Observable<RecommendedPortfolio> {
        const RecommendedPortfolio: RecommendedPortfolio = {
            totalNetWorth: 300430,
            portfolios: [
                {
                    breakdownPercentage: 70,
                    currentAmount: 78046,
                    goalName: 'Kenanga Bond Fund',
                    goalType: null,
                    id: 1,
                    investType: null,
                    nav: null,
                    scheme: null,
                    fundName: null,
                    fundOption: null
                },
                {
                    breakdownPercentage: 20,
                    currentAmount: 9674,
                    goalName: 'Areca Steady Fixed Income Fund',
                    goalType: null,
                    id: 2,
                    investType: null,
                    nav: null,
                    scheme: null,
                    fundName: null,
                    fundOption: null
                },
                {
                    breakdownPercentage: 10,
                    currentAmount: 8757,
                    goalName: 'Apex Dana Al-Kanz',
                    goalType: null,
                    id: 3,
                    investType: null,
                    nav: null,
                    scheme: null,
                    fundName: null,
                    fundOption: null
                }
            ],
            totalPortfolioNav: ''
        };
        return of(RecommendedPortfolio);
    }
}
