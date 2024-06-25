import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CanvaBoxComponent } from './components/canva-box/canva-box.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
  ],
  declarations: [
    AppComponent, 
    CanvaBoxComponent,
    NavBarComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}