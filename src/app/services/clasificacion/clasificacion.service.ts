import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Clasificacion } from '../../models/clasificacion.model';
import { URL_SERVICIOS } from 'src/config/config';


@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
    clasificacion: Clasificacion;
  token: string;
  constructor(public http: HttpClient
            ) {
  }


  getClasificacion( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/clasificaciones/paginacion/' + desde;
    return this.http.get(url);
  }
  getClasificacionMuscular( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/clasificaciones/muscular?desde=' + desde;
    return this.http.get(url);
  }
  getClasificacionReceta( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/clasificaciones/receta?desde=' + desde;
    return this.http.get(url);
  }
  getClasificacionAlimentacion( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/clasificaciones/alimentacion?desde=' + desde;
    return this.http.get(url);
  }
  crearClasificacion(clasificacion: Clasificacion) {
    const url = URL_SERVICIOS + '/api/clasificaciones';
    console.log(clasificacion);
    return this.http.post( url, clasificacion )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }

    borrar(id: number) {
      const url = URL_SERVICIOS + '/api/clasificaciones/' + id;
      console.log(url);
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: number, clasificacion: Clasificacion) {
      const url = URL_SERVICIOS + '/api/clasificaciones/' + id;
      return this.http.put(url, clasificacion)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
    getClasificacionID( id: number) {
      const url = URL_SERVICIOS + '/api/clasificaciones/' + id;
      return this.http.get(url);
    }
    busqueda( nombre: string ) {
      const url = URL_SERVICIOS + '/api/clasificaciones/busqueda';

      const busqueda = { busqueda: nombre };
      return this.http.post( url, busqueda )
      .pipe(map( (resp: any) => {
        return resp.data;
      }));
    }
}

