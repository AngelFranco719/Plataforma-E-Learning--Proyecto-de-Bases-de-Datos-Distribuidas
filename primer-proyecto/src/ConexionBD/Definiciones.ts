export interface Perfil_BD{
    ID_Perfil: number,
    Email: string,
    Contraseña: string, 
    Tipo_perfil: string, 
    Biografia: string,
    Foto_Perfil: string, 
    ID_Alumno:number | null,
    ID_Profesor: number | null
};