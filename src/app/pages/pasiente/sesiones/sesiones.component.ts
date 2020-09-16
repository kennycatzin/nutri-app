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
import { EjercicioService } from '../../../services/ejercicio/ejercicio.service';
import { SesionService } from '../../../services/sesion/sesion.service';




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
             public alimentoService: AlimentoService,
             public ejercicioService: EjercicioService,
             public sesionService: SesionService) {
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
  entrenamiento: Entrenamiento = new Entrenamiento('', '', [], this.objPrograma, 0);


  paciente: Pasiente;
  anaClinico: AnaClinico = new AnaClinico(0, 0, 0, 0, 0, 0, 0);

  sesion: Sesion = new Sesion(0, 0, 0, 0, 0, 0, 0, '0 / 0', '', this.pacienteID, this.anaClinico, this.dieta, this.entrenamiento, 0);

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

  idAlimento = 0;
  idEjercicio = 0;
  idUnidad = 1;
  cantidad = 1;
  calorias = 1;
  idTipoEjercicio = 1;

  unidad = '';
  alimento = '';
  ejercicio = '';
  musculo = '';


  sumCalorias = 0;

  itemEditar = -1;
  itemEntrenamiento = -1;
  itemEditarPrograma = -1;

  messageSuccess = false;
  messageSuccess2 = false;
  miCheck = false;

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
  getEjercicios() {
    this.ejercicioService.getClasificado(this.idTipoEjercicio)
    .subscribe( (data: any) => {
    this.misEjercicios = data.data;
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
      this.misUnidades = data.data;
    });
  }
  getClaisificaciones() {
    this.clasificacionService.getClasificacionReceta()
    .subscribe( (data: any) => {
      this.clasificaciones = data.data;
    });
  }
  reiniciarValores() {
    this.idAlimento = 0;
    this.idUnidad = 1;
    this.cantidad = 1;
    this.calorias = 1;
    this.itemEditar = -1;
  }
  onSelectChange(deviceValue) {
    this.idAlimento = deviceValue;
    this.getAlimentos();
  }
  onSelectChangeEjercicio(deviceValue) {
    this.idEjercicio = deviceValue;
  }
  onSelectChangeMusculo(deviceValue) {
    this.idTipoEjercicio = deviceValue;
    this.getEjercicios();
  }
  agregarAlimento() {
    if ( this.idAlimento > 0) {
          this.showID(this.idAlimento);
    } else {
      return false;
    }
  }
  agregarEjercicio() {
    if ( this.idEjercicio > 0) {
      this.showEjercicioID(this.idEjercicio);
    } else {
      return false;
    }
  }
  showEjercicioID(id: number) {
    this.ejercicioService.getByID(id)
      .subscribe((data: any) => {
        this.ejercicio = data.data.nombre;
        this.getMusculo();
      });
  }
  getMusculo() {
    this.clasificacionService.getClasificacionID(this.idTipoEjercicio)
    .subscribe((data: any) => {
      this.musculo = data.data.nombre;
      this.continnuarEjercicio();
    });
  }
  showID(id: number) {
    this.alimentoService.getShowID(id)
      .subscribe((data: any) => {
        this.alimento = data.data.nombre;
        this.sumCalorias = data.data.calorias;
        this.getUnidad();
      });
  }
  getUnidad() {
    this.unidadService.getById(this.idUnidad)
      .subscribe((data: any) => {
        this.unidad = data.data[0].nombre;
        this.continnuar();
      });
  }
  continnuarEjercicio() {
    const ejercicio = new DetPrograma(this.ejercicio, this.musculo, this.idEjercicio, 0);
    this.miDetPrograma.push(ejercicio);
    this.objDetPrograma = this.miDetPrograma;
  }
  continnuar() {
    const alimentos = new DetalleAlimento(
    this.cantidad, this.idUnidad, this.unidad, this.comida.id,
    this.alimento, this.idAlimento, this.calorias, 0);
    this.miDetalle.push(alimentos);
    this.objetoDetalle = this.miDetalle;
  }
  agregarComida() {
    if ( this.miDetalle.length <= 0 || this.comida.nombre.length < 3) {
        return false;
    }
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
    this.messageSuccess = true;
    this.setVisible();

    this.comida = new Comida('', 0, '', [], 0);
    this.idAlimento = 0;
    // this.dataSource.data = this.objetoComida;
  }
  agregarPrograma() {
    if ( this.miDetPrograma.length <= 0 || this.programa.nombre.length < 3 ||
       this.programa.repeticiones < 1 || this.programa.vueltas < 1 || this.programa.descanso < 1) {
      return false;
  }
    console.log(this.itemEditarPrograma);
    if (this.itemEditarPrograma >= 0) {
      this.programa[this.itemEditarPrograma] = this.programa;
    } else {
      const programa = new Programa(this.programa.nombre, this.programa.notas,
      this.programa.repeticiones, this.programa.vueltas, this.programa.descanso, this.miDetPrograma, 0 );
      this.miPrograma.push(programa);
    }


    this.objPrograma = this.miPrograma;
    this.detPrograma = new DetPrograma('', '', 1, 0);
    this.miDetPrograma = [];
    this.objDetPrograma = [];


    this.programa = new Programa('', '', 0, 0, 0, [], 0);

    this.miEntrenamiento[this.itemEntrenamiento].programa = this.objPrograma;
    this.objEntrenamiento[this.itemEntrenamiento].programa = this.miEntrenamiento[this.itemEntrenamiento].programa;
    console.log(this.objEntrenamiento);
    this.objPrograma = [];
    this.messageSuccess2 = true;
    this.setVisible();
    // this.miPrograma = [];
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
  const num2 = num - 1;
  this.miDetalle.splice(num, 1);
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
  editarPrograma(programa: Programa, item: number) {
    this.itemEditarPrograma = item;
    const arreglo = programa.det_programa;
    this.programa = programa;
    this.miDetPrograma = arreglo;
    this.objDetPrograma = programa.det_programa;
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
    this.miComida.splice(num, 1);
    this.objetoComida = this.miComida;
    }
    delItemDetPrograma(num: number) {
      this.miDetPrograma.splice(num, 1);
      this.objDetPrograma = this.miDetPrograma;
    }
    delItemPrograma(num: number) {
      this.miPrograma.splice(num, 1);
      this.objPrograma = this.miPrograma;
    }
    addDia() {
      console.log(this.miCheck);
      if (this.entrenamiento.notas.length < 4 || this.miCheck === false) {
        return false;
      }
      let diaEntrena = '';
      let contador = 0;
      const arreglo = new Array();
      for (let i = 0; i <= this.diasSemana.length - 1; i++) {
        if (this.diasSemana[i].check === true && this.diasSemana[i].disab === false) {
          this.diasSemana[i].disab = true;
          diaEntrena += this.diasSemana[i].dia + ' - ';
          arreglo.push(i);
          contador ++;
        }
      }
      diaEntrena = diaEntrena.substring(-3);
      const entrenamiento = new Entrenamiento( diaEntrena.substring(-3), this.entrenamiento.notas, arreglo, [], 0);
      this.miEntrenamiento.push(entrenamiento);

      this.objEntrenamiento = this.miEntrenamiento;
      console.log(this.objEntrenamiento);
      this.entrenamiento = new Entrenamiento('', '', [], [], 0);
      this.miCheck = false;
    }
    borrarDetPrograma(detPrograma: DetPrograma, index: number) {
      swal.fire({
        title: '¿Desea confirmar?',
        text: 'Se eliminará este registro permanentemente',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.value) {
          if (detPrograma.id === 0) {
              this.delItemDetPrograma(index);
          } else {
            // this.recetaService.deleteDetalle(detalle.id)
            // .subscribe(resp => {
            //   this.actulizar(this.receta);
            // });
          }
        }
      });
    }
    nuevoEntrenamiento() {
      this.miDetPrograma = [];
      this.objDetPrograma = this.miDetPrograma;
      this.programa = new Programa('', '', 0, 0, 0, this.objDetPrograma, 0);
    }
    addEntrenamiento(objeto: Entrenamiento, index: number) {
      console.log(index);
      this.itemEditarPrograma = -1;
      if (this.itemEntrenamiento === index) {
        console.log('edita');
        this.miPrograma = objeto.programa;
      } else {
        this.miPrograma = [];
        this.nuevoEntrenamiento();
      }
      this.itemEntrenamiento = index;
    }
    delItemEntrenamiento(objeto: Entrenamiento, index: number) {
      for (let i = 0; i <= objeto.arDias.length - 1; i++) {
        for (let j = 0; j <= this.diasSemana.length - 1; j++) {
          if (objeto.arDias[i] === j) {
              this.diasSemana[j].disab = false;
              this.diasSemana[j].check = false;
          }
        }
      }
      this.miEntrenamiento.splice(index, 1);
      this.objEntrenamiento = this.miEntrenamiento;
    }
    delEntrenamiento(objeto: Entrenamiento, index: number) {
      swal.fire({
        title: '¿Desea confirmar?',
        text: 'Se eliminará este registro permanentemente',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.value) {
          if (objeto.id === 0) {
              this.delItemEntrenamiento(objeto, index);
          } else {
            // this.recetaService.deleteDetalle(detalle.id)
            // .subscribe(resp => {
            //   this.actulizar(this.receta);
            // });
          }
        }
      });
    }
    eliminarPrograma(objeto: Programa, index: number) {
      swal.fire({
        title: '¿Desea confirmar?',
        text: 'Se eliminará este registro permanentemente',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
      }).then((result) => {
        if (result.value) {
          if (objeto.id === 0) {
              console.log(objeto);
              this.delItemPrograma(index);
          } else {
            // this.recetaService.deleteDetalle(detalle.id)
            // .subscribe(resp => {
            //   this.actulizar(this.receta);
            // });
          }
        }
      });
    }
    setVisible() {
        setTimeout(() => {
          this.messageSuccess = false;
          this.messageSuccess2 = false;
       }, 1000);
    }
     reiniciaEditar() {
    //   this.itemEntrenamiento = -1;
    this.objPrograma = this.miPrograma;
    this.detPrograma = new DetPrograma('', '', 1, 0);
    this.miDetPrograma = [];
    this.objDetPrograma = [];


    this.programa = new Programa('', '', 0, 0, 0, [], 0);

    this.miEntrenamiento[this.itemEntrenamiento].programa = this.objPrograma;
    this.objEntrenamiento[this.itemEntrenamiento].programa = this.miEntrenamiento[this.itemEntrenamiento].programa;
    console.log(this.objEntrenamiento);
    this.objPrograma = [];
    }
    checkea() {
      this.miCheck = true;
    }
    guardarCatalogo(f) {
      console.log('guardando');
    }
    guardarSesion() {
      this.sesion = new Sesion(Number(this.sesionID), this.sesion.imc, this.kgpeso, this.sesion.pctgrasa,
        this.sesion.masa_muscular, this.sesion.metabolismo_basal, this.sesion.gasto_calorico, this.sesion.frecuencia_cardiaca,
        this.sesion.tipo_cuerpo, Number(this.pacienteID), this.anaClinico, this.dieta, this.entrenamiento, Number(this.sesionID));
      // console.log(this.sesion);
      this.sesionService.guardarSesion( this.sesion )
          .subscribe( objeto => {
            // this.nuevo();
            // this.traerDatos();
            // this.reiniciarValores();
        });
    }
}
