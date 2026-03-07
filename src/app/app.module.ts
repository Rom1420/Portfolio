import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlanetComponent } from './components/planet/planet.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ScrollComponent } from './components/scroll/scroll.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    PlanetComponent,
    NavBarComponent,
    ScrollComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
