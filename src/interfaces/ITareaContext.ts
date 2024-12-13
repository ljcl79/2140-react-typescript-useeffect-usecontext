import ITarea from "./ITarea";

interface ITareaContext {
    apiURL: string,
    tareas: ITarea[],
    cargarTareas: (tareas: ITarea[]) => void,
    agregarTarea: (tarea: ITarea) => Promise<void>,
    onFinalizar: (id: string) => Promise<void>,
    onEliminar: (id: string) => Promise<void>,
}

export default ITareaContext;