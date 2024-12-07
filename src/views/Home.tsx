import { FC, ReactNode } from "react";
import './Home.css';
import Navbar from "../componentes/Navbar/Navbar";
import ListaTareas from "../componentes/ListaTareas/ListaTareas";

interface IHomeProps {
    children?: ReactNode,
    titulo?: string,
};

const Home: FC<IHomeProps> = ({ titulo = "AluraTask" }) => {

    return <>
        <Navbar titulo={titulo}></Navbar>
        <section className="main">
            <div className="container">

                <div id="task-list">
                    <ListaTareas></ListaTareas>
                </div>

            </div>
        </section>
    </>
};

export default Home;