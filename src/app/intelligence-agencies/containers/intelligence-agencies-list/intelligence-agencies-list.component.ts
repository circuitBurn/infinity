import { Component, OnInit } from '@angular/core';

import { IntelligenceAgenciesService } from '../../intelligence-agencies.service';

@Component({
  selector: 'app-intelligence-agencies-list',
  templateUrl: './intelligence-agencies-list.component.html',
  styleUrls: ['./intelligence-agencies-list.component.css']
})
export class IntelligenceAgenciesListComponent implements OnInit {

    loading: boolean = true;
    agencies = [];
    constructor(
        private agenciesService: IntelligenceAgenciesService
    ) { }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.agenciesService.getAgencies().subscribe(
            agencies => {
                this.agencies = agencies;
                this.loading = false;
            }
        )
    }

}
