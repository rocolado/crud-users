export interface Direccion {
    calle: string;
    numero: string;
    puerta: string;
    codigoPostal: string;
    ciudad: string;
}

export interface Estudios {
    institucion: string;
    titulacion: string;
    fecha: string;
}

export interface ExperienciaLaboral {
    empresa: string;
    puesto: string;
    fecha: string;
}

export interface User {
    id: number;
    nif: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    genero: string;
    fechaNacimiento: string;
    direccion: Direccion;
    tipo: string;
    estudios?: Estudios[];
    experienciaLaboral?: ExperienciaLaboral[];
}