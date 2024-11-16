import { FC, ReactNode } from "react";
import './Home.css';
import Navbar from "../componentes/Navbar/Navbar";

interface IHomeProps {
    children: ReactNode,
    titulo?: string,
};

const Home: FC<IHomeProps> = ({ children, titulo = "AluraTask" }) => {
    return <>
        <Navbar titulo={titulo}></Navbar>
        <section className="main">
            <div className="container">

                <div id="task-list">
                    {children}
                </div>

            </div>
        </section>
    </>
};

export default Home;