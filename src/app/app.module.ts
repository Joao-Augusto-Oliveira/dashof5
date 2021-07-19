import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { AuthService } from './pages/pages/auth/login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ChildsGuard } from './guards/childs.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomLayoutModule,

    // Vex
    VexModule,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ChildsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
