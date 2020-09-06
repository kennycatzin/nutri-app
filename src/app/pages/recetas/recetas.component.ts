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
detalle: DetalleAlimento = new DetalleAlimento(0, 0, 0, '', 0, 0);
receta: Receta = new Receta('', '', 0, '', 0, '', '', '', this.miDetalle);
cargando = false;
desde = 0;
objeto: Receta[];
objetoDetalle: DetalleAlimento[] = [];

totalRegistros = 0;
clasificaciones: Clasificacion;

unidades: Unidad;
misUnidades: Unidad[];

alimentos: Alimento;
misAlimentos: Alimento[];

tipoAlimentos: Clasificacion;
misTiposAlimentos: Clasificacion[];

idAlimento = 0;
idUnidad = 0;
cantidad = 0;
calorias = 0;


  ngOnInit(): void {
    console.log(this.recetaService.getRecetaPaginacion(this.desde));
    this.getClaisificaciones();
    this.traerDatos();
    this.getUnidades();
    this.getAlimentos();
    this.getTipoAlimentos();
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
    this.receta = new Receta('', '', 0, '', 0, '', '', '', []);
  }
  actulizar(receta: Receta) {
    console.log(receta);
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
    if ( f.invalid ) {
      return;
    }
    console.log(this.receta);
    this.recetaService.guardarReceta( this.receta )
      .subscribe( objeto => {
        this.traerDatos();
    });
  }
  onSelectChange(deviceValue) {
    this.idAlimento = deviceValue;
    this.getAlimentos();
  }
  agregarAlimento() {
    const alimentos = new DetalleAlimento(
                   this.cantidad, this.idUnidad, this.receta.id, '', this.idAlimento, this.calorias, 0
    );
    this.miDetalle.push(alimentos);
    this.objetoDetalle = this.miDetalle;
    console.log(this.miDetalle);
  }
}
