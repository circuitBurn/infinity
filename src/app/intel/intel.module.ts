import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IntelComponent } from './intel-component.component';
import { IntelDashboardComponent } from './intel-dashboard/intel-dashboard.component';
import { IntelService } from './intel.service';
import { ListIntelTransactionsComponent } from './containers/list-intel-transactions/list-intel-transactions.component';

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
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot(
        routes,
        { useHash: true }
    )
  ],
  declarations: [
    IntelComponent,
    IntelDashboardComponent,
    ListIntelTransactionsComponent
  ],
  providers: [
    IntelService
  ]
})
export class IntelModule { }
