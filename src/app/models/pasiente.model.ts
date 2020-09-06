export class Pasiente {
    constructor(
        public apellidopaterno: string,
        public apellidomaterno: string,
        public nombres: string,
        public correo: string,
        public fechanacimiento: string,
        public estatura: number,
        public objetivo: string,
        public genero: string,
        public imagen: string,
        public id?: number
    ) {
    }
}
