import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { AuthService } from './pages/pages/auth/login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ChildsGuard } from './guards/childs.guard';
import { AlertGuard } from './guards/alert.guard';
import { AioTableDeactivateGuard } from './guards/aio-table-deactivate.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomLayoutModule,
    MatDialogModule,

    // Vex
    VexModule,
  ],
  providers: [
    AuthService, 
    AuthGuard,
    ChildsGuard,
    AlertGuard,
    AioTableDeactivateGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
