interface IFiltrosContext {
    filtro: string,
    setFiltro: (valor: string) => void,
    finalizadas: boolean,
    setFinalizadas: (updateFn: (prevValue: boolean) => boolean) => void,
}

export default IFiltrosContext;