import { AioTableDeactivateGuard } from './../../../guards/aio-table-deactivate.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AioTableRoutingModule } from './aio-table-routing.module';
import { AioTableComponent } from './aio-table.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductCreateModule } from './product-create/product-create.module';
import { ProductUpdateModule } from './product-update/product-update.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [AioTableComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    AioTableRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    ProductUpdateModule,
    ProductCreateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,    
    MatDialogModule
  ],
  providers: [AioTableDeactivateGuard]
})
export class AioTableModule {
}
