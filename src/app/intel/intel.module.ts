import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IntelComponent } from './intel-component.component';
import { IntelDashboardComponent } from './intel-dashboard/intel-dashboard.component';
import { IntelService } from './intel.service';

const routes: Routes = [
    {
        path: 'intel',
        component: IntelComponent,
        children: [
            {
                path: '',
                component: IntelDashboardComponent
            }
        ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(
        routes,
        { useHash: true }
    )
  ],
  declarations: [
    IntelComponent,
    IntelDashboardComponent
  ],
  providers: [
    IntelService
  ]
})
export class IntelModule { }
