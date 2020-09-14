export class Ejercicio {
    constructor(
        public nombre: string,
        public clasificacion_id: number,
        public descripcion: string,
        public imagen?: string,
        public id?: number
    ) {
    }
}
