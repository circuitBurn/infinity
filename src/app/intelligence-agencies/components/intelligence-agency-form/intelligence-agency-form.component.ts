import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Agency } from "../../models/intelligence-agency.model";

export class Operative {
  name: string;
}

@Component({
  selector: "app-intelligence-agency-form",
  templateUrl: "./intelligence-agency-form.component.html",
  styleUrls: ["./intelligence-agency-form.component.css"]
})
export class IntelligenceAgencyFormComponent {
  @Input() agency: Agency;

  @Output() update: EventEmitter<Agency> = new EventEmitter<Agency>();

  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(agency: Agency, isValid: boolean) {
    if (isValid) {
      this.update.emit(agency);
    }
  }

  handleCancel() {
    this.cancel.emit();
  }

  setFocus($event) {
    $event.focus();
  }
}
