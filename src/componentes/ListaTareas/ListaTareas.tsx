import { FC, useEffect, /*useRef,*/ useState } from "react";
import './ListaTareas.css';
import ITarea from "../../interfaces/ITarea";
import Tarea from "../Tarea/Tarea";
import Formulario from "../Formulario/Formulario";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import fetchDataAPI from "../../services/APIService";

interface IProps {
    filtro: string,
    finalizadas: boolean
};


const ListaTareas: FC<IProps> = ({ filtro, finalizadas }) => {

    //const creacionComponente = useRef<boolean>(true);
    //const [tareas, setTareas] = useState();
    const apiURL = 'http://localhost:3000/tareas';
    const [loading, setLoading] = useState(false);
    const [tareas, setTareas] = useState<ITarea[]>([

    ]);

    // const guardarDatosEnLocalStorage = (clave: string, valor: ITarea[]) => {
    //     localStorage.setItem(clave, JSON.stringify(valor));
    // }

    // const cargarDatosDeLocalStorage = (clave: string) => {
    //     const data: string | null = localStorage.getItem(clave);
    //     return data && data !== 'undefined' ? JSON.parse(data) as ITarea[] : [];
    // }

    // useEffect(() => {
    //     setTareas(cargarDatosDeLocalStorage("tareas").map((tarea: ITarea) => {
    //         return {
    //             ...tarea,
    //             fecha: new Date(tarea.fecha)
    //         }
    //     }));
    // }, []);

    // useEffect(() => {
    //     //Callback
    //     if (creacionComponente.current) {
    //         creacionComponente.current = false;
    //         return;
    //     }
    //     guardarDatosEnLocalStorage("tareas", tareas);
    //     toast('Tareas actualizadas');

    // }, [tareas]);



    useEffect(() => {
        const cargarTareasDesdeAPI = async () => {
            setLoading(true);
            const res = await fetchDataAPI<ITarea[]>(apiURL);

            if (res.error) {
                toast(res.error);
            } else if (res.data && Array.isArray(res.data)) {
                setTareas(res.data.map((tarea: ITarea) => {
                    return {
                        ...tarea,
                        fecha: new Date(tarea.fecha)
                    }
                }));
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

    const agregarTarea = async (tarea: ITarea) => {

        const res = await fetchDataAPI<ITarea>(apiURL, "POST", tarea);
        if (res.error) {
            toast(res.error);
        } else {
            setTareas([...tareas, tarea]);
        }
    }

    const onFinalizar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "PATCH", { estado: 'Finalizado' });

        if (res.error) {
            toast(res.error);
        } else {
            setTareas(prev => prev.map(tarea => tarea.id === id ?
                { ...tarea, estado: 'Finalizado' } : tarea))
        }
    }

    const onEliminar = async (id: string) => {
        const endPoint = `${apiURL}/${id}`;
        const res = await fetchDataAPI<ITarea>(endPoint, "DELETE");

        if (res.error) {
            toast(res.error);
        } else {
            setTareas(prev => prev.filter(tarea => tarea.id !== id));
        }
    }
    if (loading) {
        return (<h1>Cargando tareas...</h1>)
    }

    return (
        <>
            <div className="formWrapper">
                <h2>Creación de Tareas</h2>
                <Formulario onSubmit={agregarTarea}></Formulario>
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
                                onFinalizar={onFinalizar}
                                onEliminar={onEliminar}></Tarea>
                        ))
                    }
                </ul>
            </div>
            <ToastContainer />
        </>
    )
};

export default ListaTareas;