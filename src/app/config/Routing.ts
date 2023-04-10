import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { MCajaComponent } from '../components/management/caja/m-cajas.component';
import { DigitalizarUnidadDocumentalComponent } from '../components/management/digitalizar-unidad-documental/digitalizar-unidad-documental.component';
import { MSociedadComponent } from '../components/management/sociedad/m-sociedad.component';
import { MParametrizacionesComponent } from '../components/management/masivo/m-parametrizaciones/m-parametrizaciones.component';
import { MPerfilesComponent } from '../components/management/perfil/m-perfiles.component';
import { RolPerfilComponent } from '../components/management/rol-perfil/rol-perfil.component';
import { MRolesComponent } from '../components/management/rol/m-roles.component';
import { TrasladoUnidadDocumentalComponent } from '../components/management/traslado-unidad-documental/traslado-unidad-documental.component';
import { MUnidadDocumentalComponent } from '../components/management/unidad-documental/m-unidad-documental.component';
import { MUsuarioComponent } from '../components/management/usuario/m-usuario.component';
import { QCajaComponent } from '../components/query/caja/q-cajas.component';
import { QParametrizacionesComponent } from '../components/query/masivo/q-parametrizaciones/q-parametrizaciones.component';
import { QPerfilesComponent } from '../components/query/perfil/q-perfiles.component';
import { QRolesComponent } from '../components/query/rol/q-roles.component';
import { QSociedadAreaComponent } from '../components/query/sociedad-area/q-sociedad-area.component';
import { QSociedadComponent } from '../components/query/sociedad/q-sociedad.component';
import { QUnidadDocumentalComponent } from '../components/query/unidad-documental/q-unidad-documental.component';
import { QUsuarioSedeComponent } from '../components/query/usuario-sede/q-usuario-sede.component';
import { QUsuarioComponent } from '../components/query/usuario/q-usuario.component';
import { RestaurarClaveComponent } from '../components/restaurar-clave/restaurar-clave.component';
import { Guardian } from './Guardian';
import { MSociedadAreaComponent } from '../components/management/sociedad-area/m-sociedad-area.component';
import { MUsuarioSedeComponent } from '../components/management/usuario-sede/m-usuario-sede.component';
import { RecepcionComponent } from '../components/management/recepcion/recepcion.component';
import { ActaComponent } from '../components/management/acta/acta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'restaurar-clave', component: RestaurarClaveComponent },

  { path: 'home', component: HomeComponent, canActivate: [Guardian] },

  { path: 'q-rol', component: QRolesComponent, canActivate: [Guardian] },
  { path: 'm-rol', component: MRolesComponent, canActivate: [Guardian] },

  { path: 'm-rolPerfil', component: RolPerfilComponent, canActivate: [Guardian] },

  { path: 'q-perfil', component: QPerfilesComponent, canActivate: [Guardian] },
  { path: 'm-perfil', component: MPerfilesComponent, canActivate: [Guardian] },

  { path: 'q-usuario', component: QUsuarioComponent, canActivate: [Guardian] },
  { path: 'm-usuario', component: MUsuarioComponent, canActivate: [Guardian] },


  { path: 'q-caja', component: QCajaComponent, canActivate: [Guardian] },
  { path: 'm-caja', component: MCajaComponent, canActivate: [Guardian] },

  { path: 'q-unidad-documental', component: QUnidadDocumentalComponent, canActivate: [Guardian] },
  { path: 'm-unidad-documental', component: MUnidadDocumentalComponent, canActivate: [Guardian] },

  { path: 'traslado-unidad-documental', component: TrasladoUnidadDocumentalComponent, canActivate: [Guardian] },
  { path: 'digitalizar-unidad-documental', component: DigitalizarUnidadDocumentalComponent, canActivate: [Guardian] },
  { path: 'recepcion-unidad-documental', component: RecepcionComponent, canActivate: [Guardian] },
  { path: 'acta', component: ActaComponent, canActivate: [Guardian] },

  { path: 'q-parametrizacion/area', component: QParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'q-parametrizacion/cliente', component: QParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'q-parametrizacion/contenedor', component: QParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'q-parametrizacion/tipo-documental', component: QParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'q-parametrizacion/sede', component: QParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'm-parametrizacion/area', component: MParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'm-parametrizacion/cliente', component: MParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'm-parametrizacion/contenedor', component: MParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'm-parametrizacion/tipo-documental', component: MParametrizacionesComponent, canActivate: [Guardian] },
  { path: 'q-sociedad', component: QSociedadComponent, canActivate: [Guardian] },
  { path: 'm-sociedad', component: MSociedadComponent, canActivate: [Guardian] },
  { path: 'q-sociedad-area', component: QSociedadAreaComponent, canActivate: [Guardian] },
  { path: 'm-sociedad-area', component: MSociedadAreaComponent, canActivate: [Guardian] },
  { path: 'q-usuario-sede', component: QUsuarioSedeComponent, canActivate: [Guardian] },
  { path: 'm-usuario-sede', component: MUsuarioSedeComponent, canActivate: [Guardian] },

  { path: 'm-parametrizacion/sede', component: MParametrizacionesComponent, canActivate: [Guardian] },

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
