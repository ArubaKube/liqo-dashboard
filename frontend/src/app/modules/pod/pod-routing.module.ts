import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodListComponent } from "./pages/pod-list/pod-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: ':namespaceName',
    component: PodListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodRoutingModule {}
