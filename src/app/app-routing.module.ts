import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { Report1Component } from './demo/report1/report1.component';


const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/guest/login',
        pathMatch: 'full'
      },
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/default',
      //   pathMatch: 'full'
      // },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'invoice-list',
        loadComponent: () => import('./demo/invoice-list/invoice-list.component').then((c) => c.InvoiceListComponent)
      },
      {
        path: 'invoice-list/details',
        loadComponent: () => import('./demo/invoice-list/details/details.component').then((c) => c.DetailsComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      {
        path: 'Report',
        loadComponent: () => import('./demo/admin-panel/admin-panel.component').then((c)=> c.AdminPanelComponent)
      },
      {
        path: 'upload-invoice',
        loadComponent: () => import('./demo/invoice-list/invoice-list.component').then((c)=> c.InvoiceListComponent)
      },
      {
        path: 'user-register',
        loadComponent: () => import('./demo/user-register/user-register.component').then(c => c.UserRegisterComponent)
      },
      {
        path: 'Report_validators',
        loadComponent: () => import('./demo/report1/report1.component').then(c => c.Report1Component)
      },
      {
        path: 'Report_Aging',
        loadComponent: () => import('./demo/report2/report2.component').then(c => c.Report2Component)
      },
        

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
