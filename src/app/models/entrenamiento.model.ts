import { Programa } from './programa.model';
export class Entrenamiento {
    constructor(
        public dias: string,
        public notas: string,
        public arDias: any[],
        public programa: Programa[],
        public id?: number
    ) {
    }
}
