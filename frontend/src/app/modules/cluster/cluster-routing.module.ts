import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterDetailComponent } from "./pages/cluster-detail/cluster-detail.component";
import { ClusterListComponent } from "./pages/cluster-list/cluster-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ClusterListComponent,
  },
  {
    path: 'detail/:id',
    component: ClusterDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClusterRoutingModule {}
