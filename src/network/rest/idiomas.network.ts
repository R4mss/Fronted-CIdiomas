import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CENTRO_IDIOMAS_API_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

// instance.interceptors.request.use((config) => {
//     const storage = window.localStorage as Storage;
//     const token = storage.getItem('token');
//     if (token !== null) {
//         config.headers.Authorization = 'Bearer ' + JSON.parse(token);
//     }
//     return config;
// });


// export async function ValidarTokenRest<Void>(signal = null): Promise<Response<Void> | RestError> {
//     return await Resolve.create<Void>(instance.get<Void>("/Aplicacion/validarToken", { signal: signal! }));
// }

export async function ValidarEstudianteExistente<RespValue>(codigo: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>("/Estudiante/ValidarEstudianteExistente/" + codigo, { signal: signal! }));
}

export async function InsertarDatosEstudiantePrimerLogin<RespValue>(EstudianteId: string, ProgramaId: number, ModalidadId: number, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post<RespValue>(`/Estudiante/InsertarDatosEstudiantePrimerLogin/${EstudianteId}/${ProgramaId}/${ModalidadId}`, { signal: signal! }));
}

export async function ListarIdioma<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Idioma/ListarIdioma", { signal: abortController?.signal }));
}

export async function ListarSede<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Sede/ListarSede", { signal: abortController?.signal }));
}

export async function ListarModalidad<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Modalidad/ListarModalidad", { signal: abortController?.signal }));
}

export async function ListarPrograma<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Programa/ListarPrograma", { signal: abortController?.signal }));
}

export async function ListarTurno<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Turno/ListarTurno", { signal: abortController?.signal }));
}

export async function ListarPeriodo<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Periodo/ListarPeriodo", { signal: abortController?.signal }));
}

export async function ListarTipoEstudio<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/TipoEstudio/ListarTipoEstudio", { signal: abortController?.signal }));
}

export async function ListarAsignatura<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Asignatura/ListarAsignatura", { signal: abortController?.signal }));
}

export async function ListarDocenteIdiomasBusqueda<Listas>( busqueda: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarDocenteIdiomasBusqueda/${busqueda}`, { signal: abortController?.signal }));
}

//Horario

export async function ListarHorarioPag<ListasPag>(IdiomaId: number, SedeId: string, ModalidadId: number, posPagina:number, filaPagina:number, abortController: AbortController | null = null): Promise<Response<ListasPag> | RestError> {
    return await Resolve.create(instance.get<ListasPag>(`/Horario/ListarHorarioPag/${IdiomaId}/${SedeId}/${ModalidadId}/${posPagina}/${filaPagina}`, { signal: abortController?.signal }));
}

export async function ListarHorarioDetalleId<Listas>(HorarioId: number, abortController: AbortController | null = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create(instance.get<Listas>(`/Horario/ListarHorarioDetalleId/${HorarioId}`, { signal: abortController?.signal }));
}


export async function InsertarActualizarHorario<RespValue>(mode: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarActualizarHorario/${mode} `, params, { signal: abortController?.signal }));
}

export async function InsertarActualizarHorarioDetalle<RespValue>(mode: string, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Horario/InsertarActualizarHorarioDetalle/${mode} `, params, { signal: abortController?.signal }));
}

// export async function InsertarDatosEstudiantePrimerLogin<RespValue>(EstudianteId: string, ProgramaId: number, ModalidadId: number, signal = null): Promise<Response<RespValue> | RestError> {
//     return await Resolve.create<RespValue>(instance.post<RespValue>(`/Estudiante/InsertarDatosEstudiantePrimerLogin/${EstudianteId}/${ProgramaId}/${ModalidadId} `, { signal: signal! }));
// }








