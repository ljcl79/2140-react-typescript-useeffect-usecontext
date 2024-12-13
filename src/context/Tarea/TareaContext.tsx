import { createContext } from "react";
import ITareaContext from "../../interfaces/ITareaContext";

//1.Creamos el contexto
const TareaContext = createContext<ITareaContext>({
    apiURL: '',
    tareas: [],
    cargarTareas: () => { },
    agregarTarea: async () => { },
    onFinalizar: async () => { },
    onEliminar: async () => { },
});

export default TareaContext;