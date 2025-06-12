import { Component } from '@angular/core';
import { PortfolioComponent as AdminPortfolioComponent} from 'src/app/pages/admin/customer/customer-detail/portfolio/portfolio.component';

@Component({
    selector: 'app-portfolio',
    templateUrl: '../../../../admin/customer/customer-detail/portfolio/portfolio.component.html',
    styleUrls: ['../../../../admin/customer/customer-detail/portfolio/portfolio.component.scss'],
    standalone: false
})
export class PortfolioComponent extends AdminPortfolioComponent {}
