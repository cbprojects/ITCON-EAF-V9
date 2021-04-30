import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Guardian } from './Guardian';
import { HomeComponent } from '../components/home/home.component';
import { QRolesComponent } from '../components/query/rol/q-roles.component';
import { MRolesComponent } from '../components/management/rol/m-roles.component';
import { QPerfilesComponent } from '../components/query/perfil/q-perfiles.component';
import { MPerfilesComponent } from '../components/management/perfil/m-perfiles.component';
import { QUsuarioComponent } from '../components/query/usuario/q-usuario.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [Guardian] },
  { path: 'q-rol', component: QRolesComponent, canActivate: [Guardian] },
  { path: 'm-rol', component: MRolesComponent, canActivate: [Guardian] },
  { path: 'q-perfil', component: QPerfilesComponent, canActivate: [Guardian] },
  { path: 'm-perfil', component: MPerfilesComponent, canActivate: [Guardian] },
  { path: 'q-usuario', component: QUsuarioComponent, canActivate: [Guardian] },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
