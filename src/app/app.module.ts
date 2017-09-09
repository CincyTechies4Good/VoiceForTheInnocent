import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* Pipes */
import { ResourceFilterPipe } from './pipes/resource-filter.pipe';

/* Components */
import { AppComponent } from './app.component';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';

/* Services */
import { DataService } from './services/data.service';

/* App Routing */
import { appRoutingComponents, AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ResourceComponent,
    ResourceFilterPipe,
    appRoutingComponents
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
