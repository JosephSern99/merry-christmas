import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardModel } from 'src/app/core/models/dashboard/dashboard.model';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';
import { ListingPopupDetailComponent } from 'src/app/pages/admin/listing-popup/base-detail/base-detail.component';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Component({
    selector: 'app-dashboard-detail',
    templateUrl: './dashboard-detail.component.html',
    styleUrls: ['./dashboard-detail.component.scss'],
    standalone: false
})
export class DashboardDetailComponent extends ListingPopupDetailComponent implements OnInit {
    @ViewChild('myCanvas') canvas: ElementRef;

    barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            // yAxes: [{
            //     gridLines: {
            //         drawTicks: false,
            //     },
            //     ticks: {
            //         fontSize: 14,
            //         padding: 10,
            //         fontColor: '#888888'
            //     }
            // }],
            // xAxes: [{
            //     display: true,
            //     gridLines: {
            //         drawTicks: false,
            //         drawOnChartArea: false
            //     },
            //     ticks: {
            //         beginAtZero: true,
            //         fontSize: 14,
            //         padding: 10,
            //         fontColor: '#888888'
            //     }
            // }]
        },
        // tooltips: {
        //     displayColors: false
        // }
    };
    barChartLabels: string[] = [];
    barChartLegend = false;
    barChartPlugins = [];
    barChartType: ChartType = 'bar';
    graphTypeSelected: string = 'Monthly';

    detail: DashboardModel;

    barChartData = [{
        data: [],
        label: '',
        backgroundColor: null,
        borderWidth: 0,
        hoverBackgroundColor: null,
        hoverBorderWidth: 0
    }];
    // barChartColors: Color[];
    gradient: CanvasGradient;

    constructor(
        protected apiService: DashboardService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        private popupService: PopupService,
    ) {
        super(apiService, activatedRoute, router);
    }

    ngOnInit(): void {
        this.getDashboard();
    }

    getDashboard(): void {
        this.apiService.getDashboard().subscribe(data => {
            this.detail = data;

            // this.barChartLabels = this.detail.newUserCountList.map( e => e.title);
            // this.barChartData.map( e => e. = this.detail.newUserCountList.map( d => d.value);
            // console.log("detail : ", this.detail);
            // console.log("chart label : ", this.barChartLabels);

            setTimeout(() => {
                this.storeDataInChart();
            });
        });
    }

    storeDataInChart() {
        if (!this.detail.newUserCountList) {
            return;
        }

        let dataChart = [];

        for (let chartData of this.detail.newUserCountList) {
            this.barChartLabels.push(chartData.title);
            dataChart.push(chartData.value);
        }

        this.barChartData = [
            {
                data: dataChart,
                label: 'Users',
                backgroundColor: this.generateGradient(false),
                borderWidth: 0,
                hoverBackgroundColor: this.generateGradient(true),
                hoverBorderWidth: 0
            },
        ]
    }

    generateGradient(hover: boolean): CanvasGradient {
        const opacity = hover ? 0.8 : 1;
        const ctx = (document.getElementById("chart-canvas") as HTMLCanvasElement).getContext("2d");

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, `rgba(137, 229, 211, ${opacity})`);
        gradient.addColorStop(1, `rgba(0, 209, 179, ${opacity})`);

        return gradient;
    }
}
