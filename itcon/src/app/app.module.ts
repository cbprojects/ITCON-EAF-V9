// Imports PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DividerModule } from "primeng/divider";
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from "primeng/password";
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';

// Imports Utilidades
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Functions } from './config/Functions';
import { TextProperties } from './config/TextProperties';
import { Util } from './config/Util';

// Imports Esenciales
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './config/Routing';

// Imports Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MCajaComponent } from './components/management/caja/m-cajas.component';
import { MPerfilesComponent } from './components/management/perfil/m-perfiles.component';
import { MRolesComponent } from './components/management/rol/m-roles.component';
import { QCajaComponent } from './components/query/caja/q-cajas.component';
import { QPerfilesComponent } from './components/query/perfil/q-perfiles.component';
import { QRolesComponent } from './components/query/rol/q-roles.component';
import { QUsuarioComponent } from './components/query/usuario/q-usuario.component';
import { Guardian } from './config/Guardian';

// Imports Componentes Internos
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DigitalizarUnidadDocumentalComponent } from './components/management/digitalizar-unidad-documental/digitalizar-unidad-documental.component';
import { MParametrizacionesComponent } from './components/management/masivo/m-parametrizaciones/m-parametrizaciones.component';
import { RolPerfilComponent } from './components/management/rol-perfil/rol-perfil.component';
import { TrasladoUnidadDocumentalComponent } from './components/management/traslado-unidad-documental/traslado-unidad-documental.component';
import { MUnidadDocumentalComponent } from './components/management/unidad-documental/m-unidad-documental.component';
import { MUsuarioComponent } from './components/management/usuario/m-usuario.component';
import { QParametrizacionesComponent } from './components/query/masivo/q-parametrizaciones/q-parametrizaciones.component';
import { QUnidadDocumentalComponent } from './components/query/unidad-documental/q-unidad-documental.component';
import { RestaurarClaveComponent } from './components/restaurar-clave/restaurar-clave.component';
import { Enumerados } from './config/Enumerados';
import { ObjectModelInitializer } from './config/ObjectModelInitializer';
import { SesionService } from './services/sesionService/sesion.service';


// Constantes
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#fff",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "three-strings",
  "blur": 5,
  "fgsColor": "#fff",
  "fgsPosition": "center-center",
  "fgsSize": 180,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 40,
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#761e0e",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center"
};


// Componentes
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QRolesComponent,
    MRolesComponent,
    QPerfilesComponent,
    MPerfilesComponent,
    QUsuarioComponent,
    MUsuarioComponent,
    RolPerfilComponent,
    LoginComponent,
    RestaurarClaveComponent,
    QCajaComponent,
    MCajaComponent,
    QUnidadDocumentalComponent,
    MUnidadDocumentalComponent,
    TrasladoUnidadDocumentalComponent,
    DigitalizarUnidadDocumentalComponent,
    MParametrizacionesComponent,
    QParametrizacionesComponent
  ],
  imports: [
    AppRoutingModule,
    PickListModule,
    BrowserModule,
    NgxJsonViewerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgSelectModule,
    RouterModule,

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    MessagesModule,
    MessageModule,
    ToastModule,
    ScrollPanelModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    PasswordModule,
    DividerModule,
    CalendarModule,
    ProgressBarModule,
    TreeModule,
    ContextMenuModule,
    FileUploadModule,
    ConfirmPopupModule
  ],
  providers: [TextProperties, Enumerados, ObjectModelInitializer, Guardian, Util, Functions, MessageService, ConfirmationService, SesionService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }