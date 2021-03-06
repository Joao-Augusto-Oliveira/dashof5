import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { AioTableDeactivateGuard } from 'src/app/guards/aio-table-deactivate.guard';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { AioTableComponent } from './aio-table.component';

const routes: VexRoutes = [
  {
    path: '',
    component: AioTableComponent,
    data: {
      toolbarShadowEnabled: true
    },
    canDeactivate: [AioTableDeactivateGuard], 
    children: [
      {
        path: "products/update/:id",
        loadChildren: () => import('./product-update/product-update.module').then(m => m.ProductUpdateModule),
      }
    ]   
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AioTableRoutingModule {
}
