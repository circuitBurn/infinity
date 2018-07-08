import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
    {
        path: '',
        component: MainComponent
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
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CoreModule,
    SharedModule,
    IntelligenceAgenciesModule,
    IntelModule,
    HttpClientModule,
    GamesModule,
    IntelligenceOperativeModule,
    RouterModule.forRoot(
        routes,
        { useHash: true }
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
