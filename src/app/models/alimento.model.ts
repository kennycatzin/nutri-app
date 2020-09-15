export class Alimento {
    constructor(
        public nombre: string,
        public proteinas: number,
        public carbohidratos: number,
        public grasas: number,
        public calorias: number,
        public clasificacion_id: number,
        public id?: number
    ) {
    }
}
