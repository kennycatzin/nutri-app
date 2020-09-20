import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { Clasificacion } from '../../models/clasificacion.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.component.html',
  styleUrls: ['./clasificaciones.component.css']
})
export class ClasificacionesComponent implements OnInit {
  clasificacion: Clasificacion = new Clasificacion('', '', 0);
  cargando = false;
  desde = 0;

  objeto: Clasificacion[];
  totalRegistros = 0;
  clasificaciones: Clasificacion;

  constructor(public clasicificacionService: ClasificacionService) { }

  ngOnInit() {
    console.log(this.clasicificacionService.getClasificacion(this.desde));
    this.traerDatos();
  }
  borrar(clasificacion: Clasificacion) {
    return false;
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
       this.clasicificacionService.borrar(clasificacion.id)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  nuevo() {
    this.clasificacion = new Clasificacion('', '', 0);
  }
  actulizar(clasificacion: Clasificacion) {
    console.log(clasificacion);
    this.clasificacion = clasificacion;
    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}
  guardarCatalogo(f: NgForm) {
    if ( f.invalid ) {
      return;
    }
    console.log(this.clasificacion);
    if (this.clasificacion.id) {
      this.clasicificacionService.actualizar(this.clasificacion.id, this.clasificacion)
      .subscribe( objeto => {
        console.log(objeto);
        this.traerDatos();
      });
    } else {
      this.clasicificacionService.crearClasificacion( this.clasificacion )
      .subscribe( objeto => {
        console.log(objeto);
        this.traerDatos();
      });
    }
  }
  traerDatos() {
    console.log(this.desde);
    this.cargando = true;
    this.clasicificacionService.getClasificacion(this.desde)
    .subscribe( (data: any) => {
      this.objeto = data.data;
      this.totalRegistros = data.numero;
      this.cargando = false;
      this.clasificacion = new Clasificacion('', '', 0);
    });
  }
  busqueda(termino: string) {
    if (termino === '') {
      this.traerDatos();
      return;
    }
    this.clasicificacionService.busqueda(termino)
          .subscribe((clasificacion: Clasificacion[]) => {
            this.objeto = clasificacion;
    });
  }
  cambiarDesde(numero: number) {
    const desde = this.desde + numero;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0 ) {
      return;
    }
    this.desde += numero;
    this.traerDatos();
  }
}
