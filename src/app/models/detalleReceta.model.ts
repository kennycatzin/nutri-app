export class DetalleAlimento {
    constructor(
        public cantidad: number,
        public unidad_id: number,
        public receta_id: number,
        public nombre: string,
        public alimento_id: number,
        public calorias: number,
        public id?: number
    ) {
    }
}
