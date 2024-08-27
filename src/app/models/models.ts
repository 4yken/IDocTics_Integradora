export interface User{
    nombres: string;
    apellidos: string;
    correo: string;
    uid: string;
    password: string;
    telefono:string;
    perfil: string,
    matricula: string;
    carrera?:string;
    num_seguro_social?:string;
    cedula?:string;
}

export interface Citas{
    id: string,
    nombre_paciente: string ,
    apellidos_paciente: string,
    matricula: string,
    nombre_doctor?: string,
    fecha: string,
    hora: string,
    detalles?: string,
    medicamentos?: string,
    enfermedad?: string,
    estado:boolean
}

export interface certificados{
    id:string,
    fecha_creacion: string,
    fecha_reincorporacion: string,
    nombre_paciente:string,
    apellidos_paciente:string,
    carrera:string,
    matricula:string,
    detalles:string,
    nombre_doctor:string
}
