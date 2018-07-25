import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StandingsComponent } from "./standings/standings.component";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { AdminGuard } from "../admin.guard";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "standings",
    canActivate: [AdminGuard],
    children: [
        {
            path: '',
            component: StandingsComponent
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
      StandingsComponent
]
})
export class StandingsModule {}
