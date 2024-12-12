import { FC, ReactNode, useContext, useState } from "react";
import ITareaContext from "../../interfaces/ITareaContext";
import ITarea from "../../interfaces/ITarea";
import fetchDataAPI from "../../services/APIService";
import { toast } from "react-toastify";
import TareaContext from "./TareaContext";

//2.Compartir el contexto
interface ITareaContextProps {
    children: ReactNode
};

export const TareasProvider: FC<ITareaContextProps> = ({ children }) => {
    const apiURL = 'http://localhost:3000/tareas';
    const [tareas, setTareas] = useState<ITarea[]>([

    ]);

    const agregarTarea = async (tarea: ITarea) => {

        const res = await fetchDataAPI<ITarea>(apiURL, "POST", tarea);
        if (res.error) {
            toast(res.error);
        } else {
            setTareas(() => [...tareas, tarea]);
        }
    }

    const onFinalizar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "PATCH", { estado: 'Finalizado' });

        if (res.error) {
            toast(res.error);
        } else {
            setTareas(prev => prev!.map(tarea => tarea.id === id ?
                { ...tarea, estado: 'Finalizado' } : tarea))
        }
    }

    const onEliminar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "DELETE");

        if (res.error) {
            toast(res.error);
        } else {
            setTareas(prev => prev!.filter(tarea => tarea.id !== id));
        }
    }

    const objProvider: ITareaContext = {
        apiURL,
        tareas,
        setTareas,
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