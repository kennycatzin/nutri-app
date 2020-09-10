import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasienteService } from '../../../services/pasiente/pasiente.service';
import { Pasiente } from 'src/app/models/pasiente.model';
import { Sesion } from '../../../models/sesion.model';
import { AnaClinico } from '../../../models/anaclinico.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private pacienteService: PasienteService) { }
  sesionID = 0;
  pacienteID = 0;
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



  paciente: Pasiente;
  anaClinico: AnaClinico;
  sesion: Sesion = new Sesion(0, 0, 0, 0, '', 0, 0, 0, '0 / 0', '', this.pacienteID, this.anaClinico, 0);
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id, paciente_id}) => this.cargarSesion(id, paciente_id));
    this.traerPaciente();
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
    const suma = this.hOficina + this.hMovimiento + this.hEjercicio + this.hSueno;
    let mb;
    if (suma !== 24) {
      swal.fire('Las horas no suman 24', 'La suma de las horas deberían ser 24', 'warning');
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
    let fcUno = ((220 - this.edad) - this.fCardiacaReposo) * 0.65 + this.fCardiacaReposo;
    fcUno = Math.round(fcUno);
    let fcDos = ((220 - this.edad) - this.fCardiacaReposo) * 0.75 + this.fCardiacaReposo;
    fcDos = Math.round(fcDos);
    this.sesion.frecuencia_cardiaca = fcUno + ' / ' + fcDos;
  }

}
