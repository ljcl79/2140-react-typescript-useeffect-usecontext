import { FC, ReactNode, useState } from "react";
import './Home.css';
import Navbar from "../componentes/Navbar/Navbar";
import ListaTareas from "../componentes/ListaTareas/ListaTareas";

interface IHomeProps {
    children?: ReactNode,
    titulo?: string,
};

const Home: FC<IHomeProps> = ({ titulo = "AluraTask" }) => {
    const [filtro, setFiltro] = useState<string>('');
    const [finalizadas, setFinalizadas] = useState<boolean>(false);

    return <>
        <Navbar titulo={titulo} setFiltro={setFiltro} setFinalizadas={setFinalizadas}></Navbar>
        <section className="main">
            <div className="container">

                <div id="task-list">
                    <ListaTareas filtro={filtro} finalizadas={finalizadas}></ListaTareas>
                </div>

            </div>
        </section>
    </>
};

export default Home;