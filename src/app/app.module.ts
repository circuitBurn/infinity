import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { IntelligenceAgenciesModule } from './intelligence-agencies/intelligence-agencies.module';
import { IntelModule } from './intel/intel.module';
import { HttpClientModule } from '@angular/common/http';
import { IntelligenceOperativeModule } from './intelligence-operatives/operative.module';
import { MainComponent } from './main/main.component';
import { GamesModule } from './games/games.module';
import { ProfileComponent } from './profile/profile.component';
import { StandingsModule } from './standings/standings.module';
import { DashboardComponent, DialogSelectPlayer } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    DashboardComponent,
    DialogSelectPlayer
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    SharedModule,
    IntelligenceAgenciesModule,
    IntelModule,
    HttpClientModule,
    GamesModule,
    StandingsModule,
    IntelligenceOperativeModule,
    RouterModule.forRoot(
        routes,
        { useHash: true }
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogSelectPlayer
  ]
})
export class AppModule { }
