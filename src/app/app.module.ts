import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { FieldComponent } from './field/field.component';
import { MinesComponent } from './mines/mines.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    FieldComponent,
    MinesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
