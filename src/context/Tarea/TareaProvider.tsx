import { FC, ReactNode, useContext, useReducer } from "react";
import ITareaContext from "../../interfaces/ITareaContext";
import ITarea from "../../interfaces/ITarea";
import fetchDataAPI from "../../services/APIService";
import { toast } from "react-toastify";
import TareaContext from "./TareaContext";
import { tareasReducer, TareasState } from "../../reducers/TareasReducer";

//2.Compartir el contexto
interface ITareaContextProps {
    children: ReactNode
};

const initialState: TareasState = {
    tareas: []
};

export const TareasProvider: FC<ITareaContextProps> = ({ children }) => {
    const apiURL = 'http://localhost:3000/tareas';
    // const [tareas, setTareas] = useState<ITarea[]>([

    // ]);
    const [state, dispatch] = useReducer(tareasReducer, initialState)

    const cargarTareas = (tareas: ITarea[]) => {
        dispatch({ type: 'CARGAR_TAREAS', payload: tareas });
    }

    const agregarTarea = async (tarea: ITarea) => {

        const res = await fetchDataAPI<ITarea>(apiURL, "POST", tarea);
        if (res.error) {
            toast(res.error);
        } else {
            dispatch({ type: 'AGREGAR_TAREA', payload: tarea });
        }
    }

    const onFinalizar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "PATCH", { estado: 'Finalizado' });

        if (res.error) {
            toast(res.error);
        } else {
            dispatch({ type: 'FINALIZAR_TAREA', payload: id });
        }
    }

    const onEliminar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "DELETE");

        if (res.error) {
            toast(res.error);
        } else {
            dispatch({ type: 'ELIMINAR_TAREA', payload: id });
        }
    }

    const objProvider: ITareaContext = {
        apiURL,
        tareas: state.tareas,
        cargarTareas,
        agregarTarea,
        onFinalizar,
        onEliminar
    };

    return (
        <TareaContext.Provider value={objProvider}>
            {children}
        </TareaContext.Provider >
    )
};

export const useTareasContext = () => {
    const context = useContext(TareaContext);

    if (!context) {
        throw new Error('useTareasContext debe usarse dentro de un TareasProvider');
    }
    return context;
}