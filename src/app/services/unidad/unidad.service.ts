import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Unidad } from '../../models/unidad.model';
import { URL_SERVICIOS } from 'src/config/config';



@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  unidad: Unidad;
  token: string;
  constructor(public http: HttpClient
            ) {
  }


  getElementos( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/unidades/get-unidades';
    return this.http.get(url);
  }
  getById( id: number) {
    const url = URL_SERVICIOS + '/api/unidades/get-byid/' + id;
    return this.http.get(url);
  }


}

