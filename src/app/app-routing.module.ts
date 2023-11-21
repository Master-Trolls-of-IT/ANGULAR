import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from '~/app/guards/authenticated.guard';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login-page.module').then((m) => m.LoginPageModule),
    data: { hideHeader: true },
  },
  {
    path: 'auction',
    loadChildren: () =>
      import('~/app/auction/auction-page.module').then(
        (m) => m.AuctionPageModule,
      ),
    canActivate: [AuthenticatedGuard],
  },
  { path: '**', redirectTo: RoutesEnum.Login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard],
})
export class AppRoutingModule {}
