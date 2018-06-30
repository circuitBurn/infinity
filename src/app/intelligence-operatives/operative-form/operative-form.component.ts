import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Operative } from "../models/operative.model";

@Component({
  selector: 'operative-form',
  templateUrl: './operative-form.component.html',
  styleUrls: ['./operative-form.component.css']
})
export class OperativeFormComponent {

    @Input()
    operative: Operative;

    @Output()
    update: EventEmitter<Operative> = new EventEmitter<Operative>();

    @Output()
    cancel: EventEmitter<any> = new EventEmitter<any>();

    handleSubmit(operative: Operative, isValid: boolean) {
        console.log(operative);
        if (isValid) {
            this.update.emit(operative);
        }
    }

    handleCancel() {
        this.cancel.emit();
    }

}
