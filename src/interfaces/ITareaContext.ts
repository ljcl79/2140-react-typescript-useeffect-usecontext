import ITarea from "./ITarea";

interface ITareaContext {
    filtro: string,
    setFiltro: (valor: string) => void,
    finalizadas: boolean,
    setFinalizadas: (updateFn: (prevValue: boolean) => boolean) => void,
    tareas: ITarea[],
    setTareas: (updateFn: (prevValue?: ITarea[]) => ITarea[]) => void,
}

export default ITareaContext;