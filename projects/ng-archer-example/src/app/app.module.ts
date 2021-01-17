import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArcherBtnModule, ArcherFormControlModule, ArcherTabsModule } from 'projects/ng-archer/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    ArcherFormControlModule,
    ArcherTabsModule,
    ArcherBtnModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
