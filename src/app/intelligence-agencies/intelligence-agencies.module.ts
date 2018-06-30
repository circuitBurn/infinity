import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IntelligenceAgenciesListComponent } from './containers/intelligence-agencies-list/intelligence-agencies-list.component';
import { IntelligenceAgenciesComponent } from './intelligence-agencies.component';
import { IntelligenceAgenciesService } from './intelligence-agencies.service';
import { SharedModule } from '../shared/shared.module';
import { IntelligenceAgencyDetailComponent } from './containers/intelligence-agency-detail/intelligence-agency-detail.component';
import { IntelligenceAgencyFormComponent } from './components/intelligence-agency-form/intelligence-agency-form.component';


const routes: Routes = [
    {
        path: 'intelligence-agencies',
        component: IntelligenceAgenciesComponent,
        children: [
            {
                path: '',
                component: IntelligenceAgenciesListComponent
            },
            {
                path: 'detail/:id',
                component: IntelligenceAgencyDetailComponent
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
    IntelligenceAgenciesComponent,
    IntelligenceAgenciesListComponent,
    IntelligenceAgencyDetailComponent,
    IntelligenceAgencyFormComponent
  ],
  providers: [
    IntelligenceAgenciesService,
  ]
})
export class IntelligenceAgenciesModule { }
