import { FC, useEffect, /*useRef,*/ useState } from "react";
import './ListaTareas.css';
import ITarea from "../../interfaces/ITarea";
import Tarea from "../Tarea/Tarea";
import Formulario from "../Formulario/Formulario";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import fetchDataAPI from "../../services/APIService";
import { useTareasContext } from "../../context/Tarea/TareaProvider";
import { useFiltrosContext } from "../../context/Filtros/FiltrosProvider";

interface IProps {

};


const ListaTareas: FC<IProps> = ({ }) => {

    //const [tareas, setTareas] = useState();
    const [loading, setLoading] = useState(false);

    //3. Consumiendo el contexto
    const { apiURL, tareas, cargarTareas } = useTareasContext();
    const { filtro, finalizadas } = useFiltrosContext();

    useEffect(() => {
        const cargarTareasDesdeAPI = async () => {
            setLoading(true);
            const res = await fetchDataAPI<ITarea[]>(apiURL);

            if (res.error) {
                toast(res.error);
            } else if (res.data && Array.isArray(res.data)) {
                cargarTareas(res.data);
            }
            setLoading(false);

        }
        cargarTareasDesdeAPI();
    }, [])



    const tareasFiltradas: ITarea[] = tareas.filter((tarea: ITarea) => {
        return (tarea.nombre.toLowerCase().includes(filtro.toLowerCase()) || filtro === '')
            &&
            (!finalizadas || tarea.estado === 'Finalizado');
    })


    if (loading) {
        return (<h1>Cargando tareas...</h1>)
    }

    return (
        <>
            <div className="formWrapper">
                <h2>Creación de Tareas</h2>
                <Formulario></Formulario>
            </div>

            <hr />
            <div id="task-form">
                <h2>Lista de Tareas</h2>
                <ul id="tasks">
                    {
                        tareasFiltradas.map((tarea: ITarea, index: number) => (
                            <Tarea tarea={tarea}
                                key={tarea.id}
                                index={index}
                            ></Tarea>
                        ))
                    }
                </ul>
            </div>
            <ToastContainer />
        </>
    )
};

export default ListaTareas;