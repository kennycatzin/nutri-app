import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Receta } from '../../models/receta.model';
import { URL_SERVICIOS } from 'src/config/config';
import { SubirArchivoService } from '../archivos/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  receta: Receta;
  token: string;
  constructor(public http: HttpClient,
              public subirArchivo: SubirArchivoService
            ) {
  }
  getRecetaPaginacion( desde: Number = 0) {
    const url = URL_SERVICIOS + '/api/recetas/get-receta-paginado/' + desde;
    return this.http.get(url);
  }
  guardarReceta(receta: Receta) {
        const url = URL_SERVICIOS + '/api/recetas/store-receta';
        console.log(receta);
        return this.http.post( url, receta )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }
    borrar(id: number) {
      const url = URL_SERVICIOS + '/api/recetas/delete-receta/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    busqueda( nombre: string ) {
      const url = URL_SERVICIOS + '/api/recetas/busqueda-receta';
      const busqueda = { busqueda: nombre };
      return this.http.post( url, busqueda )
      .pipe(map( (resp: any) => {
        return resp.data;
      }));
    }
    deleteDetalle(id: number) {
        const url = URL_SERVICIOS + '/api/recetas/delete-detalle/' + id;
        return this.http.delete(url)
        .pipe(map((resp: any) => {
            swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
            return true;
        }));
    }
    getInfoReceta(id: number) {
        console.log(id);
        const url = URL_SERVICIOS + '/api/recetas/get-info-receta/' + id;
        return this.http.get(url);
    }
    subirImagen(archivo: File, id: string) {
        this.subirArchivo.subirArchivo(archivo, 'coaches', id)
        .then( (resp: any) => {
          swal.fire('Operación exitosa', '' + resp.mensaje + '', 'success');
        })
        .catch( (resp: any) => {
          swal.fire('Operación con errores', '' + resp.mensaje + '', 'info');
        });
      }
}

