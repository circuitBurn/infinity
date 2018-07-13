import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { SharedModule } from '../shared/shared.module';
import { GameCreateFormComponent } from './components/game-create-form/game-create-form.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { RulesComponent } from './components/rules/rules.component';

const routes: Routes = [
    {
        path: 'games',
        component: GamesComponent,
        children: [
            {
                path: '',
                component: GameDashboardComponent
            },
            {
                path: 'create',
                component: GameCreateFormComponent
            },
            {
                path: 'rules',
                component: RulesComponent
            },
            {
                path: 'detail/:id',
                component: GameDetailComponent
            },
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
      GameDashboardComponent, 
      GamesComponent, 
      GameCreateFormComponent, GameDetailsComponent, GameDetailComponent, RulesComponent
    ]
})
export class GamesModule { }
