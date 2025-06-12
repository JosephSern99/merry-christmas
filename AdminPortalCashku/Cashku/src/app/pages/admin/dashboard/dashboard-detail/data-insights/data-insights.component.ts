import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, forkJoin } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GetTotalAumApiModel, GetTotalClientsApiModel } from 'src/app/core/models/dashboard/dashboard.model';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';
import { BlockUiService } from 'src/app/shared/services/blockUi/block-ui.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';
import { ReportEmailInputComponent } from '../../../report/report-email-input/report-email-input.component';

@Component({
    selector: 'app-data-insights',
    templateUrl: './data-insights.component.html',
    styleUrls: [
        '../dashboard-detail.component.scss',
        './data-insights.component.scss',
    ],
    standalone: false
})
export class DataInsightsComponent implements OnInit {
    isLoading = false;
    totalClients: GetTotalClientsApiModel;
    totalAUM: GetTotalAumApiModel;

    constructor(
        private apiService: DashboardService,
        private blockUiService: BlockUiService,
        private popupService: PopupService,
        private modalService: NgbModal,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        forkJoin([this.getTotalAUM$(), this.getTotalClients$()])
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe();
    }

    onExport(): void {
        const option: any = {
            size: 'lg',
            center: true,
            windowClass: 'modal-popup-lg',
            backdropClass: 'backdrop-popup',
        };
        const modalRef = this.modalService.open(ReportEmailInputComponent, option);
        modalRef.result.then(
            (data: any) => {
                this.exportDashboardSummary(data.email);
            },
            () => {},
        )
    }

    exportDashboardSummary(email: string): void {
        this.blockUiService.open();
        this.apiService
            .postExportDashboardSummary(email)
            .pipe(finalize(() => (this.blockUiService.close())))
            .subscribe({
                next: () => this.popupService.alert('Data insights export successfully'),
                error: (err) => {
                    if (err.error.messages[0].message) {
                        this.popupService.alert(err.error.messages[0].message);
                    } else {
                        this.popupService.alert('Server Error');
                    }
                },
            });
    }

    private getTotalClients$(): Observable<GetTotalClientsApiModel> {
        return this.apiService
            .getTotalClients()
            .pipe(tap((result) => (this.totalClients = result)));
    }

    private getTotalAUM$(): Observable<GetTotalAumApiModel> {
        return this.apiService
            .getTotalAUM()
            .pipe(tap((result) => (this.totalAUM = result)));
    }
}
