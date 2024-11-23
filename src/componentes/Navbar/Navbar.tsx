import { FC, useRef } from "react";

interface IProps {
    titulo: string,
    setFiltro: (value: string) => void,
    setFinalizadas: (updateFn: (prevValue: boolean) => boolean) => void,
};

const Navbar: FC<IProps> = ({ titulo, setFiltro, setFinalizadas }) => {
    const searchWrapperRef = useRef<HTMLDivElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    function toggleSearch(): void {
        if (searchWrapperRef.current && closeButtonRef.current && searchButtonRef.current) {
            searchWrapperRef.current.classList.add('active');
            closeButtonRef.current.classList.add('active');
            searchButtonRef.current.classList.add('inactive');
            searchInputRef.current?.focus();
        }
    }

    function toggleForm() {

        //renderTasks();
    }

    function closeSearch() {
        if (
            searchWrapperRef.current &&
            closeButtonRef.current &&
            searchInputRef.current &&
            searchButtonRef.current
        ) {
            searchWrapperRef.current.classList.remove('active');
            closeButtonRef.current.classList.remove('active');
            searchButtonRef.current.classList.remove('inactive');
            searchInputRef.current.value = '';
        }
        //renderTasks();
    }


    return (
        <header className="header">
            <h1>{titulo}</h1>
            <div className="search-container">
                <button ref={searchButtonRef} className="btn-icon" onClick={toggleSearch}>🔍</button>
                <div ref={searchWrapperRef} className="search-wrapper" id="searchWrapper">
                    <div className="inputSearchWrapper">
                        <input ref={searchInputRef} type="text" className="search-input"
                            placeholder="Digite para filtrar" onChange={(e) => setFiltro(e.target.value)} />
                        <button ref={closeButtonRef} className="close-search" onClick={closeSearch}>✕</button>
                    </div>
                    <div>
                        <label>
                            Mostrar sólo finalizadas:
                            <input type="checkbox" onClick={() => setFinalizadas((prev) => !prev)} />
                        </label>
                    </div>
                </div>
                <button className="btn" onClick={toggleForm}>Nueva Tarea</button>
            </div>
        </header>

    )
};

export default Navbar;