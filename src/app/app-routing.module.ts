import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { EditArabicComponent } from './Views/edit-arabic/edit-arabic.component';
import { EditFrenchComponent } from './Views/edit-french/edit-french.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit', component: EditSiteComponent ,children:[
    {path:'', redirectTo: '/fr', pathMatch: 'full'},
    {path:'fr',component:EditFrenchComponent},
    {path:'ar',component:EditArabicComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//,{useHash:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,EditSiteComponent]
