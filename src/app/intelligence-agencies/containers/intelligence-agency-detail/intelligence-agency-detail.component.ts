import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IntelligenceAgenciesService } from '../../intelligence-agencies.service';
import { Agency } from "../../models/intelligence-agency.model";
import { UserService } from "../../../user.service";

@Component({
  selector: "app-intelligence-agency-detail",
  templateUrl: "./intelligence-agency-detail.component.html",
  styleUrls: ["./intelligence-agency-detail.component.css"]
})
export class IntelligenceAgencyDetailComponent implements OnInit {
  agency;

  showEdit: boolean = false;
  editing: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private agencyService: IntelligenceAgenciesService
    ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe(params => {
        const id = params["id"];
        this.agencyService.getAgency(id).subscribe(
            agency => {
                this.agency = agency
                this.showEdit = this.userService.getUser().id == agency['user_id'];
            }
        )
    });
  }

  handleEdit() {
      this.editing = true;
  }

  onUpdateAgency(agency: Agency) {
      this.editing = false;
      this.agencyService.update(agency).subscribe(
          response => this.refresh(),
          error => {
              console.log(error)
          }
      );
  }

  onUpdateAgencyCancel() {
    this.editing = false;
  }
}
