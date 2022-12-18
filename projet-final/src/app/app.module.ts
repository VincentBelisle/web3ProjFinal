import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnteteComponent } from './entete/entete.component';
import { TabsComponent } from './tabs/tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListeVehiculesComponent } from './liste-vehicules/liste-vehicules.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { VehiculeService } from './vehicule.service';
import { ListeVehiculesTypeComponent } from './liste-vehicules-type/liste-vehicules-type.component';



@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    TabsComponent,
    ListeVehiculesComponent,
    ListeVehiculesTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [VehiculeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
