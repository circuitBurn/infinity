import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OperativeDetailComponent } from './operative-detail/operative-detail.component';
import { OperativeService } from './operative.service';
import { OperativeFormComponent } from './operative-form/operative-form.component';

const routes: Routes = [
    {
        path: 'operative/:id',
        component: OperativeDetailComponent
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
    OperativeDetailComponent,
    OperativeFormComponent
  ],
  providers: [
    OperativeService,
  ]
})
export class IntelligenceOperativeModule { }
