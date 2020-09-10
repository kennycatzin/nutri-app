import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasienteService } from '../../services/pasiente/pasiente.service';
import { Pasiente } from './../../models/pasiente.model';
import { Sesion } from 'src/app/models/sesion.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private pacienteService: PasienteService) { }
  pacienteID = 0;
  objeto: Sesion[];
  pasiente: Pasiente = new Pasiente('', '', '', '', '',  0, '', '', '');
  ngOnInit() {
    this.activatedRoute.params.subscribe(({id}) => this.cargarSesion(id));
    this.traerDatos();
  }
  cargarSesion( id: number ) {
    this.pacienteID = id;
    console.log(this.pacienteID);
  }
  nuevo() {
    return true;
  }
  traerDatos() {
    this.pacienteService.getPaciente(this.pacienteID)
    .subscribe( (data: any) => {
      console.log(data);
      this.pasiente = data.data[0];
      this.objeto = data.data[0].historial;
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
    return edad;
  }
}
