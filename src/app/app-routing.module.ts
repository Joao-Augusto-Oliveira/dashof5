import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from './guards/auth.guard';
import { ChildsGuard } from './guards/childs.guard';
import { AlertGuard } from './guards/alert.guard';

const routes: VexRoutes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },  
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'calendar',
        redirectTo: '/',       
      },
      {
        path: '',
       loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
       canActivate: [AuthGuard],
       canActivateChild: [ChildsGuard],
        data: {
          toolbarShadowEnabled: true
        }
      },     
      {
        path: 'apps',
        canActivate: [AuthGuard],        
        children: [                        
          {
            path: 'calendar',
            loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
            canActivateChild: [ChildsGuard],
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'aio-table',
            loadChildren: () => import('./pages/apps/aio-table/aio-table.module').then(m => m.AioTableModule),
            canActivateChild: [ChildsGuard],
          }         
        ]
      },
      {
        path: 'pages',
        canActivate: [AuthGuard],
        canActivateChild: [ChildsGuard],
        children: [          
          {
            path: 'indicadores',
            loadChildren: () => import('./pages/indicadores/indicadores.module').then(m => m.IndicadoresModule),
            canActivateChild: [AlertGuard],
          },
        ]
      },      
      {
        path: '**',
        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module),
      },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
