import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlanetComponent } from './components/planet/planet.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { ScrollService } from './services/scroll.service';
import { ConveyorBeltComponent } from './components/conveyor-belt/conveyor-belt.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
  ],
  declarations: [
    AppComponent, 
    PlanetComponent,
    NavBarComponent,
    ScrollComponent,
    ConveyorBeltComponent
  ],
  providers: [ScrollService],
  bootstrap: [AppComponent],
})
export class AppModule {}