import { createContext, FC, ReactNode, useContext, useState } from "react";
import ITareaContext from "../interfaces/ITareaContext";
import ITarea from "../interfaces/ITarea";

//1.Creamos el contexto
const TareaContext = createContext<ITareaContext | undefined>(undefined);

//2.Compartir el contexto
interface ITareaContextProps {
    children: ReactNode
};

export const TareasProvider: FC<ITareaContextProps> = ({ children }) => {
    const [filtro, setFiltro] = useState<string>('');
    const [finalizadas, setFinalizadas] = useState<boolean>(false);
    const [tareas, setTareas] = useState<ITarea[]>([

    ]);

    const objProvider: ITareaContext = {
        filtro,
        setFiltro,
        finalizadas,
        setFinalizadas,
        tareas,
        setTareas
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