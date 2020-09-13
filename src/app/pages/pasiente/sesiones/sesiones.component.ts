import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasienteService } from '../../../services/pasiente/pasiente.service';
import { Pasiente } from 'src/app/models/pasiente.model';
import { Sesion } from '../../../models/sesion.model';
import { AnaClinico } from '../../../models/anaclinico.model';
import swal from 'sweetalert2';

import { DetalleAlimento } from 'src/app/models/detalleReceta.model';
import { AlimentoService } from 'src/app/services/alimento/alimento.service';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { UnidadService } from 'src/app/services/unidad/unidad.service';
import { Comida } from '../../../models/comida.model';
import { Dieta } from 'src/app/models/dieta.model';
import { Clasificacion } from 'src/app/models/clasificacion.model';
import { Unidad } from 'src/app/models/unidad.model';
import { Alimento } from 'src/app/models/alimento.model';
import { Entrenamiento } from 'src/app/models/entrenamiento.model';
import { Programa } from '../../../models/programa.model';
import { DetPrograma } from '../../../models/detallePrograma.model';
import { Ejercicio } from '../../../models/ejercicio.model';




@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})


export class SesionesComponent implements OnInit {
  diasSemana: any = [
    {
      dia: 'Lunes',
      check: false,
      disab: false,
      inl: 'inlineCheckbox1'
    },
    {
      dia: 'Martes',
      check: false,
      disab: false,
      inl: 'inlineCheckbox2'
    },
    {
      dia: 'Miercoles',
      check: false,
      disab: false,
      inl: 'inlineCheckbox3'
    },
    {
      dia: 'Jueves',
      check: false,
      disab: false,
      inl: 'inlineCheckbox4'
    },
    {
      dia: 'Viernes',
      check: false,
      disab: false,
      inl: 'inlineCheckbox5'
    },
    {
      dia: 'Sábado',
      check: false,
      disab: false,
      inl: 'inlineCheckbox6'
    },
    {
      dia: 'Domingo',
      check: false,
      disab: false,
      inl: 'inlineCheckbox7'
    },
  ];
 constructor(private activatedRoute: ActivatedRoute,
             private pacienteService: PasienteService,
             public clasificacionService: ClasificacionService,
             public unidadService: UnidadService,
             public alimentoService: AlimentoService) {
               }

  sesionID = 0;
  pacienteID = 0;

  miDetalle: Array<DetalleAlimento> = [];
  objetoDetalle: DetalleAlimento[] = [];
  detalle: DetalleAlimento = new DetalleAlimento(0, 0, '', 0, '', 0, 0);


  miComida: Array<Comida> = [];
  objetoComida: Comida[] = [];
  comida: Comida = new Comida('', 0, '', this.objetoDetalle, 0);

  miDieta: Array<Dieta> = [];
  objDieta: Dieta[] = [];
  dieta: Dieta = new Dieta('', 0, this.objetoComida, 0);

  miDetPrograma: Array<DetPrograma> = [];
  objDetPrograma: DetPrograma[] = [];
  detPrograma: DetPrograma = new DetPrograma('', '', 0, 0);

  miPrograma: Array<Programa> = [];
  objPrograma: Programa[] = [];
  programa: Programa = new Programa('', '', 0, 0, 0, this.objDetPrograma, 0);

  miEntrenamiento: Array<Entrenamiento> = [];
  objEntrenamiento: Entrenamiento[] = [];
  entrenamiento: Entrenamiento = new Entrenamiento('', '', this.objPrograma, 0);


  paciente: Pasiente;
  anaClinico: AnaClinico = new AnaClinico(0, 0, 0, 0, 0, 0);

  sesion: Sesion = new Sesion(0, 0, 0, 0, '', 0, 0, 0, '0 / 0', '', this.pacienteID, this.anaClinico, this.dieta, 0);

  clasificaciones: Clasificacion;

  unidades: Unidad;
  misUnidades: Unidad[];

  alimentos: Alimento;
  misAlimentos: Alimento[];

  tipoAlimentos: Clasificacion;
  misTiposAlimentos: Clasificacion[];

  tipoEjercicios: Ejercicio;
  misTiposEjercicios: Ejercicio[];

  Ejercicios: Ejercicio;
  misEjercicios: Ejercicio[];

  edad = 0;
  kgpeso = 0;
  estatura = 0;
  genero = '';

  proteinas = 0;
  carbohidratos = 0;
  grasas = 0;
  fibras = 0;
  totCal = 0;
  ltsAgua = 0;
  fCardiacaReposo = 0;

  hOficina = 0;
  hMovimiento = 0;
  hEjercicio = 0;
  hSueno = 0;

  fcUno = 0;
  fcDos = 0;

  idAlimento = 1;
  idUnidad = 1;
  cantidad = 1;
  calorias = 1;

  unidad = '';
  alimento = '';
  sumCalorias = 0;

  itemEditar = -1;


    ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id, paciente_id}) => this.cargarSesion(id, paciente_id));
    this.traerPaciente();
    this.getClaisificaciones();
    this.getUnidades();
    this.getAlimentos();
    this.getTipoAlimentos();
    this.getTipoEjercicios();
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
  getTipoEjercicios() {
    this.clasificacionService.getClasificacionMuscular()
    .subscribe( (data: any) => {
    this.misTiposEjercicios = data.data;
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
  reiniciarValores() {
    this.idAlimento = 1;
    this.idUnidad = 1;
    this.cantidad = 1;
    this.calorias = 1;
    this.itemEditar = -1;
  }
  onSelectChange(deviceValue) {
    this.idAlimento = deviceValue;
    this.getAlimentos();
  }
  agregarAlimento() {
    this.showID(this.idAlimento);
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
  continnuar() {
    const alimentos = new DetalleAlimento(
    this.cantidad, this.idUnidad, this.unidad, this.comida.id,
    this.alimento, this.idAlimento, this.calorias, 0);
    this.miDetalle.push(alimentos);
    this.objetoDetalle = this.miDetalle;
  }
  agregarComida() {
    if (this.itemEditar >= 0) {
      this.miComida[this.itemEditar] = this.comida;
    } else {
      const comida = new Comida(
        this.comida.nombre, this.comida.calorias, this.comida.notas, this.miDetalle, 0);
      this.miComida.push(comida);
    }
    this.objetoComida = this.miComida;
    this.detalle = new DetalleAlimento(0, 0, '', 0, '', 0, 0);
    this.objetoDetalle = [];
    this.miDetalle = [];
    this.reiniciarValores();
    // this.dataSource.data = this.objetoComida;
  }
borrarObjeto(detalle: DetalleAlimento, index: number) {
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
        // this.recetaService.deleteDetalle(detalle.id)
        // .subscribe(resp => {
        //   this.actulizar(this.receta);
        // });
      }
    }
  });
}
delItem(num: number) {
  let num2 = num - 1;
  console.log(num);
  this.miDetalle.splice(num, 1);
  console.log(this.miDetalle);
  this.objetoDetalle = this.miDetalle;
  }
  nuevo() {
    this.comida = new Comida('', 0, '', [], 0);
    this.detalle = new DetalleAlimento(0, 0, '', 0, '', 0, 0);
    this.objetoDetalle = [];
    this.miDetalle = [];
    this.reiniciarValores();
  }
  guardarComida() {
    this.comida.det_comidas = this.miDetalle;
    console.log(this.comida);
    this.nuevo();
    // this.recetaService.guardarReceta( this.receta )
    //   .subscribe( objeto => {
    //     this.nuevo();
    //     this.traerDatos();
    //     this.reiniciarValores();
    // });
  }
  cargarSesion( id: number, pasienteID: number ) {
    this.sesionID = id;
    this.pacienteID = pasienteID;
  }
  traerPaciente() {
      this.pacienteService.getPaciente(this.pacienteID)
      .subscribe( (data: any) => {
        console.log(data);
        this.paciente = data.data[0];
        this.calcularEdad(this.paciente.fechanacimiento);
        this.estatura = this.paciente.estatura;
        this.genero = this.paciente.genero;
      });
  }
  calcularEdad(fecha) {
    const hoy = new Date();
    const cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    this.edad = edad;
  }
  busqueda(termino: number) {
    if (termino === 0) {
      return;
    }
    this.proteinas = (termino * 3) / 5;
    this.carbohidratos = (termino * 7) / 5;
    this.grasas = (termino * 1) / 5;
    this.fibras = (termino * 3) / 5;
    this.totCal = (this.proteinas + this.carbohidratos * 4 + this.grasas * 9) * 5;
    this.ltsAgua = termino / 20;
  }
  calcular() {
    const suma = Number(this.hOficina) + Number(this.hMovimiento) + Number(this.hEjercicio) + Number(this.hSueno);
    let mb;
    if (suma !== 24) {
      swal.fire('Las horas no suman 24', 'Sólo tiene: ' + suma, 'warning');
      return false;
    }
    if ( this.genero === 'MASCULINO') {
      mb = 66 + (13.7 * this.kgpeso) + (5 * this.estatura) - (6.8 * this.edad);
      mb = Math.round(mb);
      this.sesion.metabolismo_basal =  mb;
    } else if ( this.genero === 'FEMENINO' ) {
      mb = 655 + (9.6 * this.kgpeso) + (1.7 * this.estatura) - (4.7 * this.edad);
      this.sesion.metabolismo_basal =  Math.round(mb);
    }
    let gc = ((1.3 * mb) * this.hOficina / 24) + ((1.9 * mb) * this.hMovimiento / 24) + ((2.5 * mb) * this.hEjercicio / 24);
    gc += ((1.1 * mb) * this.hSueno / 24);
    gc = Math.round(gc);
    this.sesion.gasto_calorico = gc;
    let fcUno = ((220 - this.edad) - this.fCardiacaReposo) * 0.65 + Number(this.fCardiacaReposo);
    fcUno = Math.round(fcUno);
    let fcDos = ((220 - this.edad) - this.fCardiacaReposo) * 0.75 + Number(this.fCardiacaReposo);
    fcDos = Math.round(fcDos);
    this.sesion.frecuencia_cardiaca = fcUno + ' / ' + fcDos;
  }
  editarComida(comida: Comida, item: number) {
    this.itemEditar = item;
    const arreglo = comida.det_comidas;
    this.comida = comida;
    this.miDetalle = arreglo;
    this.objetoDetalle = comida.det_comidas;
  }
  eliminarComida(comida: Comida, item: number) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
        if (comida.id === 0) {
            console.log(comida);
            console.log('soy nuevo');
            this.delItemComida(item);
        } else {
          // this.recetaService.deleteDetalle(detalle.id)
          // .subscribe(resp => {
          //   this.actulizar(this.receta);
          // });
        }
      }
    });
  }
  delItemComida(num: number) {
    console.log(num);
    this.miComida.splice(num, 1);
    this.objetoComida = this.miComida;
    }
    addDia() {
      let diaEntrena = '';
      let contador = 0;
      for (let i = 0; i <= this.diasSemana.length - 1; i++) {
        if (this.diasSemana[i].check === true && this.diasSemana[i].disab === false) {
          this.diasSemana[i].disab = true;
          diaEntrena += this.diasSemana[i].dia + ' - ';
          contador ++;
        }
      }
      diaEntrena = diaEntrena.substring(-3);
      const entrenamiento = new Entrenamiento( diaEntrena.substring(-3), this.entrenamiento.notas, [], 0);
      this.miEntrenamiento.push(entrenamiento);

      this.objEntrenamiento = this.miEntrenamiento;
      this.entrenamiento = new Entrenamiento('', '', [], 0);
    }
    borrarDetPrograma(detPrograma: DetPrograma){
      console.log(detPrograma);
    }
}
