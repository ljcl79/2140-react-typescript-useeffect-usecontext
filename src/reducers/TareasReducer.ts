import ITarea from "../interfaces/ITarea";

export type TareasAction =
    | { type: 'CARGAR_TAREAS', payload: ITarea[] }
    | { type: 'AGREGAR_TAREA', payload: ITarea }
    | { type: 'FINALIZAR_TAREA', payload: string }
    | { type: 'ELIMINAR_TAREA', payload: string }


export interface TareasState {
    tareas: ITarea[]
}

export function tareasReducer(
    state: TareasState,
    action: TareasAction
): TareasState {
    switch (action.type) {
        case 'CARGAR_TAREAS':
            return {
                ...state, tareas: action.payload.map((tarea: ITarea) => {
                    return {
                        ...tarea,
                        fecha: new Date(tarea.fecha)
                    }
                })
            }
        case 'AGREGAR_TAREA':
            return { ...state, tareas: [...state.tareas, action.payload] }
        case 'FINALIZAR_TAREA':
            return {
                ...state, tareas: state.tareas.map(tarea => tarea.id === action.payload ?
                    { ...tarea, estado: 'Finalizado' } : tarea)
            }
        case 'ELIMINAR_TAREA':
            return { ...state, tareas: state.tareas.filter(tarea => tarea.id !== action.payload) }
        default:
            return state;
    }
}