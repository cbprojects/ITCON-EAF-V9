// Imports PrimeNG
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

// Imports Utilidades
import { TextProperties } from './config/TextProperties';
import { Functions } from './config/Functions';
import { Util } from './config/Util';

// Imports Esenciales
import { AppRoutingModule } from './config/Routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

// Imports Componentes
import { AppComponent } from './app.component';
import { Guardian } from './config/Guardian';
import { HomeComponent } from './components/home/home.component';
import { QRolesComponent } from './components/query/rol/q-roles.component';
import { MRolesComponent } from './components/management/rol/m-roles.component';
import { QPerfilesComponent } from './components/query/perfil/q-perfiles.component';
import { MPerfilesComponent } from './components/management/perfil/m-perfiles.component';

// Imports Componentes Internos
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConsultaLazyComponent } from './components/consultaLazy/consultaLazy.component';
import { Enumerados } from './config/Enumerados';
import { ObjectModelInitializer } from './config/ObjectModelInitializer';
import { MessageService } from 'primeng/api';
import { SesionService } from './services/sesionService/sesion.service';
import { NgCircleProgressModule } from 'ng-circle-progress';


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
    ConsultaLazyComponent,
    QRolesComponent,
    MRolesComponent,
    QPerfilesComponent,
    MPerfilesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
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
    TableModule
  ],
  providers: [TextProperties, Enumerados, ObjectModelInitializer, Guardian, Util, Functions, MessageService, SesionService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }