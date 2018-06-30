import { Component, OnInit } from "@angular/core";
import { OperativeService } from "../operative.service";
import { ActivatedRoute } from "@angular/router";
import { Operative } from "../models/operative.model";

@Component({
  selector: "app-operative-detail",
  templateUrl: "./operative-detail.component.html",
  styleUrls: ["./operative-detail.component.css"]
})
export class OperativeDetailComponent implements OnInit {
  loading: boolean = true;
  operative: Operative;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private operativeService: OperativeService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      this.operativeService.getOperative(id).subscribe(operative => {
        this.operative = operative;
        this.loading = false;
      });
    });
  }

  handleEdit() {
    this.editing = true;
  }

  onUpdate(operative: Operative) {
    this.editing = false;
    this.operativeService.update(operative).subscribe(
      response => this.refresh(),
      error => {
        console.log(error);
      }
    );
  }

  onUpdateCancel() {
    this.editing = false;
  }
}
