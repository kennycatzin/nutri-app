import { Programa } from './programa.model';
export class Entrenamiento {
    constructor(
        public dias: string,
        public descripcion: string,
        public arDias: any[],
        public programa: Programa[],
        public id?: number
    ) {
    }
}
