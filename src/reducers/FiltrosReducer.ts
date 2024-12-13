export type FiltrosAction =
    | { type: 'FILTRAR_TAREAS', payload: string }
    | { type: 'MOSTRAR_FINALIZADAS' }

export interface FiltrosState {
    filtro: string;
    finalizadas: boolean;
}

export function filtrosReducer(
    state: FiltrosState,
    action: FiltrosAction
): FiltrosState {
    switch (action.type) {
        case 'FILTRAR_TAREAS':
            return { ...state, filtro: action.payload }
        case 'MOSTRAR_FINALIZADAS':
            return { ...state, finalizadas: !state.finalizadas }
        default:
            return state;
    }
}