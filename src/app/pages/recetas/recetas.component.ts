import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecetaService } from '../../services/recetas/receta.service';
import { Receta } from './../../models/receta.model';
import { Clasificacion } from '../../models/clasificacion.model';
import { ClasificacionService } from '../../services/clasificacion/clasificacion.service';
import swal from 'sweetalert2';
import { DetalleAlimento } from '../../models/detalleReceta.model';
import { UnidadService } from '../../services/unidad/unidad.service';
import { AlimentoService } from 'src/app/services/alimento/alimento.service';
import { Unidad } from '../../models/unidad.model';
import { Alimento } from 'src/app/models/alimento.model';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  constructor(public recetaService: RecetaService,
              public clasificacionService: ClasificacionService,
              public unidadService: UnidadService,
              public alimentoService: AlimentoService) { }
miDetalle: Array<DetalleAlimento> = [];
objetoDetalle: DetalleAlimento[] = [];
detalle: DetalleAlimento = new DetalleAlimento(0, 0, '', 0, '', 0, 0);
receta: Receta = new Receta('', '', 0, '', 0, '', '', '', this.objetoDetalle, 0);
cargando = false;
desde = 0;
objeto: Receta[];

totalRegistros = 0;
clasificaciones: Clasificacion;

unidades: Unidad;
misUnidades: Unidad[];

alimentos: Alimento;
misAlimentos: Alimento[];

tipoAlimentos: Clasificacion;
misTiposAlimentos: Clasificacion[];

idAlimento = 0;
idUnidad = 1;
cantidad = 1;
calorias = 1;

unidad = '';
alimento = '';
sumCalorias = 0;



  ngOnInit(): void {
    this.traerDatos();
    this.getClaisificaciones();
    this.getUnidades();
    this.getAlimentos();
    this.getTipoAlimentos();
  }
  reiniciarValores() {
    this.idAlimento = 0;
    this.idUnidad = 1;
    this.cantidad = 1;
    this.calorias = 1;
  }
  getAlimentos() {
    this.alimentoService.getClasificacion(this.idAlimento)
    .subscribe( (data: any) => {
    this.misAlimentos = data.data;
    });
  }
  getTipoAlimentos() {
    this.clasificacionService.getClasificacionAlimentacion()
    .subscribe( (data: any) => {
    this.misTiposAlimentos = data.data;
    });
  }
  getUnidades() {
    this.unidadService.getElementos()
    .subscribe( (data: any) => {
      console.log(data);
      this.misUnidades = data.data;
    });
  }
  getClaisificaciones() {
    this.clasificacionService.getClasificacionReceta()
    .subscribe( (data: any) => {
      console.log(data);
      this.clasificaciones = data.data;
    });
  }
  borrar(receta: Receta) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
       this.recetaService.borrar(receta.id)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  nuevo() {
    this.receta = new Receta('', '', 0, '', 0, '', '', '', [], 0);
    this.detalle = new DetalleAlimento(0, 0, '', 0, '', 0, 0);
    this.objetoDetalle = [];
    this.miDetalle = [];
    this.reiniciarValores();
  }
  actulizar(receta: Receta) {
    this.miDetalle = [];
    this.recetaService.getInfoReceta(receta.id)
    .subscribe( (data: any) => {
      console.log(data);
      this.objetoDetalle = data.data[0].alimentos;
      this.miDetalle = this.objetoDetalle;
      this.cargando = false;
      console.log(this.objetoDetalle);
    });
    this.receta = receta;
    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}
  traerDatos() {
    this.cargando = true;
    this.recetaService.getRecetaPaginacion(this.desde)
    .subscribe( (data: any) => {
      console.log(data);
      this.objeto = data.data;
      console.log(this.objeto);
      this.totalRegistros = data.numero;
      this.cargando = false;
    });
  }
  busqueda(termino: string) {
    if (termino === '') {
      this.traerDatos();
      return;
    }
    this.recetaService.busqueda(termino)
          .subscribe((receta: Receta[]) => {
            this.objeto = receta;
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
  guardarCatalogo(f: NgForm) {
    if ( f.invalid || this.miDetalle.length === 0) {
      return;
    }
    this.receta.alimentos = this.miDetalle;
    console.log(this.receta);
    this.recetaService.guardarReceta( this.receta )
      .subscribe( objeto => {
        this.nuevo();
        this.traerDatos();
        this.reiniciarValores();
    });
  }
  onSelectChange(deviceValue) {
    this.idAlimento = deviceValue;
    this.getAlimentos();
  }
  showID(id: number) {
    this.alimentoService.getShowID(id)
      .subscribe((data: any) => {
        console.log('aqui');
        console.log(data.data.nombre);
        this.alimento = data.data.nombre;
        this.sumCalorias = data.data.calorias;
        this.getUnidad();
      });
  }
  getUnidad() {
    this.unidadService.getById(this.idUnidad)
      .subscribe((data: any) => {
        console.log(data.data[0].nombre);
        this.unidad = data.data[0].nombre;
        this.continnuar();
      });
  }
  // showID(id: number) {
  //   this.alimentoService.getShowID(id)
  //   .then((data: any) => {
  //     this.alimento = data.data.alimento;
  //     this.unidad = data.data.calorias;
  //   });
  // }
  continnuar() {
      const alimentos = new DetalleAlimento(
      this.cantidad, this.idUnidad, this.unidad, this.receta.id,
      this.alimento, this.idAlimento, this.calorias, 0);
      this.miDetalle.push(alimentos);
      this.objetoDetalle = this.miDetalle;
  }
  agregarAlimento() {
    if (this.idAlimento > 0) {
      this.showID(this.idAlimento);
    } else {
      return false;
    }
  }
  delItem(num: number) {
    let num2 = num - 1;
    console.log(num);
    this.miDetalle.splice(num, 1);
    console.log(this.miDetalle);
    this.objetoDetalle = this.miDetalle;
    }
    borrarObjeto(detalle: DetalleAlimento, index: number) {
      console.log(detalle.id);
      swal.fire({
        title: '¿Desea confirmar?',
        text: 'Se eliminará este registro permanentemente',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.value) {
          if (detalle.id === 0) {
              console.log(detalle);
              console.log('soy nuevo');
              this.delItem(index);
          } else {
            this.recetaService.deleteDetalle(detalle.id)
            .subscribe(resp => {
              this.actulizar(this.receta);
            });
          }
        }
      });
    }
}
