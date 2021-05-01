import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { Usuario } from 'src/app/model/UsuariolModel';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-m-usuario.component',
  templateUrl: './m-usuario.component.component.html',
  styleUrls: ['./m-usuario.component.component.scss']
})
export class MUsuarioComponent implements OnInit {

  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  usuario: Usuario;
  esNuevoUsuario: boolean;

  // Utilidades
  msg: any;
  const: any;
  enumEstado: any;
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar() {
    this.enumEstado = this.enums.estado.valores;
    this.usuario = this.objectModelInitializer.getDataUsuario();
    this.esNuevoUsuario = true;
    this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, 1);
    if (this.sesionService.objUsuarioCargado !== undefined && this.sesionService.objUsuarioCargado !== null && this.sesionService.objUsuarioCargado.id > 0) {
      this.usuario = this.sesionService.objUsuarioCargado;
      this.usuario.estado = this.util.getValorEnumerado(this.enumEstado, this.usuario.estado);
      this.esNuevoUsuario = false;
    }
  }

}
