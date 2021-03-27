import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../.././services/rest.service';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { tada, fadeIn } from 'ng-animate';
import { MessageService } from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RestService, MessageService],
  animations: [
    trigger('fadeIn', [transition('* => open', useAnimation(fadeIn))])
  ]
})
export class HeaderComponent implements OnInit {
  // Objetos de datos

  // Objetos de Animaciones
  fadeIn: any;
  displayModalLogin: boolean = false;
  usuario: any;
  clave: any;
  esLogueado: boolean = false;

  // Utilidades
  msg: any;
  const: any;

  constructor(public router: Router, private route: ActivatedRoute, public restService: RestService, public messageService: MessageService, public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public sesionService: SesionService, public util: Util) {
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
  }

  showDialogLogin() {
    this.toggleDropdown('dropdownProfile');
    this.displayModalLogin = true;
  }

  aplicarMDBLogin() {
    setTimeout(() => {
      $('#login').bootstrapMaterialDesign();
    }, 10);
  }

  redirigirBlogs() {
    this.router.navigate(['blogs']);
  }

  obtenerBreadcrumb(url: string) {
    let ruta = "";
    if (url === '/home') {
      ruta = this.msg.lbl_menu_inicio;
    } else if (url === '/query') {
      ruta = this.msg.lbl_menu_consulta;
    } else if (url === '/management') {
      ruta = this.msg.lbl_menu_gestion;
    } else if (url === '/reports') {
      ruta = this.msg.lbl_menu_reportes;
    } else if (url === '/locations') {
      ruta = this.msg.lbl_menu_ubicaciones;
    } else if (url === '/notys') {
      ruta = this.msg.lbl_menu_notificaciones;
    }

    return ruta;
  }

  toggleDropdown(id) {
    $('#' + id).toggleClass('show');
  }

  login() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.esLogueado = true;
    this.cerrarModalLogin();
  }

  cerrarModalLogin() {
    this.displayModalLogin = false;
  }

  cerrarSesion() {
    this.esLogueado = false;
  }

}
