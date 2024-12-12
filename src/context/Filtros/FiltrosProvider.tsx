import { FC, ReactNode, useContext, useState } from "react";
import IFiltrosContext from "../../interfaces/IFiltrosContext";
import FiltrosContext from "./FiltrosContext";


//2.Compartir el contexto
interface IFiltrosContextProps {
    children: ReactNode
};

export const FiltrosProvider: FC<IFiltrosContextProps> = ({ children }) => {
    const [filtro, setFiltro] = useState<string>('');
    const [finalizadas, setFinalizadas] = useState<boolean>(false);

    const objProvider: IFiltrosContext = {

        filtro,
        setFiltro,
        finalizadas,
        setFinalizadas,

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