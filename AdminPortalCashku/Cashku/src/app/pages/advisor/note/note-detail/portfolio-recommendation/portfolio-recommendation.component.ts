import { Component } from '@angular/core';
import { PortfolioInformation } from 'src/app/core/models/planner-note/planner-note.model';
import { UntypedFormBuilder } from '@angular/forms';
import { ListingPopupBaseComponent } from 'src/app/pages/admin/listing-popup/base-listing.component';
import { RecommendationPortfolio } from 'src/app/core/services/api/recommendation-portfolio.service';

@Component({
    selector: 'app-portfolio-recommendation',
    templateUrl: './portfolio-recommendation.component.html',
    styleUrls: ['./portfolio-recommendation.component.scss'],
    standalone: false
})
export class PortfolioRecommendationComponent extends ListingPopupBaseComponent {

	listingDataSource: PortfolioInformation[] = [];
	displayedColumns = ['index', 'portfolio', 'riskType', 'status', 'actions'];

	constructor(
		protected apiService: RecommendationPortfolio,
		protected formBuilder: UntypedFormBuilder,
	) {
		super(apiService, formBuilder);
	}

	ngOnInit(): void {
		this.getListing();
	}

	getListing() {
		this.isListingLoading = true;
		this.apiService.getRecommendationPortfolio().subscribe(
			(success) => this.listingDataSource = success,
			(err) => { }
		).add(() => this.isListingLoading = false);
	}
}
