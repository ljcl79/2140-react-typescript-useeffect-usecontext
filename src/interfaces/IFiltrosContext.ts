interface IFiltrosContext {
    filtro: string,
    filtrarTareas: (filtro: string) => void,
    finalizadas: boolean,
    mostrarFinalizadas: () => void,
}

export default IFiltrosContext;