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
import { MUsuarioComponent } from '../components/management/usuario/m-usuario.component';
import { RolPerfilComponent } from '../components/management/rol-perfil/rol-perfil.component';
import { LoginComponent } from '../components/login/login.component';
import { RestaurarClaveComponent } from '../components/restaurar-clave/restaurar-clave.component';
import { MCajaComponent } from '../components/management/caja/m-cajas.component';
import { QCajaComponent } from '../components/query/caja/q-cajas.component';
import { MUnidadDocumentalComponent } from '../components/management/unidad-documental/m-unidad-documental.component';
import { QUnidadDocumentalComponent } from '../components/query/unidad-documental/q-unidad-documental.component';
import { TrasladoUnidadDocumentalComponent } from '../components/management/traslado-unidad-documental/traslado-unidad-documental.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurar-clave', component: RestaurarClaveComponent },
  { path: 'home', component: HomeComponent, canActivate: [Guardian] },
  { path: 'q-rol', component: QRolesComponent, canActivate: [Guardian] },
  { path: 'm-rol', component: MRolesComponent, canActivate: [Guardian] },
  { path: 'q-perfil', component: QPerfilesComponent, canActivate: [Guardian] },
  { path: 'm-perfil', component: MPerfilesComponent, canActivate: [Guardian] },
  { path: 'q-usuario', component: QUsuarioComponent, canActivate: [Guardian] },
  { path: 'm-usuario', component: MUsuarioComponent, canActivate: [Guardian] },
  { path: 'm-rolPerfil', component: RolPerfilComponent, canActivate: [Guardian] },
  { path: 'q-caja', component: QCajaComponent, canActivate: [Guardian] },
  { path: 'm-caja', component: MCajaComponent, canActivate: [Guardian] },
  { path: 'q-unidad-documental', component: QUnidadDocumentalComponent, canActivate: [Guardian] },
  { path: 'm-unidad-documental', component: MUnidadDocumentalComponent, canActivate: [Guardian] },
  { path: 'traslado-unidad-documental', component: TrasladoUnidadDocumentalComponent, canActivate: [Guardian] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
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
