import { FC, ReactNode, useContext, useReducer } from "react";
import IFiltrosContext from "../../interfaces/IFiltrosContext";
import FiltrosContext from "./FiltrosContext";
import { filtrosReducer, FiltrosState } from "../../reducers/FiltrosReducer";


//2.Compartir el contexto
interface IFiltrosContextProps {
    children: ReactNode
};

const initialState: FiltrosState = {
    filtro: '',
    finalizadas: false
}

export const FiltrosProvider: FC<IFiltrosContextProps> = ({ children }) => {
    // const [filtro, setFiltro] = useState<string>('');
    // const [finalizadas, setFinalizadas] = useState<boolean>(false);

    const [state, dispatch] = useReducer(filtrosReducer, initialState);

    const filtrarTareas = (filtro: string) => {
        dispatch({ type: 'FILTRAR_TAREAS', payload: filtro });
    }

    const mostrarFinalizadas = () => {
        dispatch({ type: 'MOSTRAR_FINALIZADAS' });
    }

    const objProvider: IFiltrosContext = {

        filtro: state.filtro,
        filtrarTareas,
        finalizadas: state.finalizadas,
        mostrarFinalizadas,

    };

    return (
        <FiltrosContext.Provider value={objProvider}>
            {children}
        </FiltrosContext.Provider >
    )
};

export const useFiltrosContext = () => {
    const context = useContext(FiltrosContext);

    if (!context) {
        throw new Error('useFiltrosContext debe usarse dentro de un FiltrosProvider');
    }
    return context;
}