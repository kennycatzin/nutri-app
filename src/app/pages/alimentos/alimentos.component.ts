import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../../services/alimento/alimento.service';
import { Alimento } from './../../models/alimento.model';
import { NgForm } from '@angular/forms';
import { Clasificacion } from '../../models/clasificacion.model';
import { ClasificacionService } from '../../services/clasificacion/clasificacion.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  constructor(public alimentoService: AlimentoService,
              public clasificacionService: ClasificacionService) { }
alimento: Alimento = new Alimento('', 0, 0, 0, 0, 0);
cargando = false;
desde = 0;

objeto: Alimento[];
totalRegistros = 0;
clasificaciones: Clasificacion;

totalCalorias = 0;


  ngOnInit() {
    console.log(this.alimentoService.getAlimentoPaginacion(this.desde));
    this.getClaisificaciones();
    this.traerDatos();
  }
  getClaisificaciones() {
    this.clasificacionService.getClasificacionAlimentacion()
    .subscribe( (data: any) => {
    this.clasificaciones = data.data;
    });
  }
  borrar(alimento: Alimento) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
       this.alimentoService.borrar(alimento.id)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  nuevo() {
    this.alimento = new Alimento('', 0, 0, 0, 0, 0, 0);
  }
  actulizar(alimento: Alimento) {
    console.log(alimento);
    this.alimento = alimento;
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
    this.alimento.calorias = this.totalCalorias;
    console.log(this.alimento);
    if (this.alimento.id) {
      this.alimentoService.actualizar(this.alimento.id, this.alimento)
      .subscribe( objeto => {
        console.log(objeto);
        this.traerDatos();
      });
    } else {
      this.alimentoService.crearAlimento( this.alimento )
      .subscribe( objeto => {
        console.log(objeto);
        this.traerDatos();
      });
    }
  }
  traerDatos() {
    this.cargando = true;
    this.alimentoService.getAlimentoPaginacion(this.desde)
    .subscribe( (data: any) => {
      console.log(data);
      this.objeto = data.data;
      console.log(this.objeto);
      this.totalRegistros = data.numero;
      this.cargando = false;
      this.totalCalorias = 0;
      this.alimento = new Alimento('', 0, 0, 0, 0, 0, 0);
    });
  }
  busqueda(termino: string) {
    if (termino === '') {
      this.traerDatos();
      return;
    }
    this.alimentoService.busqueda(termino)
          .subscribe((alimento: Alimento[]) => {
            this.objeto = alimento;
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
  calcularCalorias(termino: number) {
    this.totalCalorias = (Number(this.alimento.carbohidratos) * 4) + (Number(this.alimento.proteinas) * 4);
    this.totalCalorias += (Number(this.alimento.grasas) * 9);
    this.totalCalorias = Math.round(this.totalCalorias * 1000) / 1000;  // 55.6
    this.alimento.calorias = this.totalCalorias;
  }
}
