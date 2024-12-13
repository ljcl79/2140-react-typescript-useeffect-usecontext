import { createContext } from "react";
import IFiltrosContext from "../../interfaces/IFiltrosContext";

//1.Creamos el contexto
const FiltrosContext = createContext<IFiltrosContext>({
    filtro: '',
    filtrarTareas: () => { },
    finalizadas: false,
    mostrarFinalizadas: () => { },
});

export default FiltrosContext;