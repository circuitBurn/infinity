import { Component, OnInit } from '@angular/core';
import { IntelService } from './intel.service';

@Component({
  selector: 'app-intel-component',
  template: `<router-outlet></router-outlet>`
})
export class IntelComponent implements OnInit {

    
    constructor(
        private intelService: IntelService
    ) {}

    ngOnInit() {
        
    }
}
