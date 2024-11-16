import { ChangeEvent, FC, useState } from "react";
import './ListaTareas.css';
import ITarea from "../../interfaces/ITarea";
import Tarea from "../Tarea/Tarea";
import Formulario from "../Formulario/Formulario";

interface IProps { };


const ListaTareas: FC<IProps> = () => {

    const [filtro, setFiltro] = useState<string>('');
    const [finalizadas, setFinalizadas] = useState<boolean>(false);
    //const [tareas, setTareas] = useState();

    const [tareas, setTareas] = useState<ITarea[]>([
        {
            id: 1,
            nombre: 'Aprender React + Typescript',
            descripcion: 'Realizar la formación Alura para aprender React + Typescript',
            estado: 'Ejecución',
            fecha: new Date('2024-12-31')
        },
        {
            id: 2,
            nombre: 'Practicar typescript',
            descripcion: 'Practicar el lenguaje',
            estado: 'Finalizado',
            fecha: new Date('2024-09-30')
        },
        {
            id: 3,
            nombre: 'Hacer caminata',
            descripcion: 'Mantener la salud',
            estado: 'Planificado',
            fecha: new Date('2024-12-31')
        },
    ]);

    const tareasFiltradas: ITarea[] = tareas.filter((tarea: ITarea) => {
        return (tarea.nombre.toLowerCase().includes(filtro.toLowerCase()) || filtro === '')
            &&
            (!finalizadas || tarea.estado === 'Finalizado');
    })

    const agregarTarea = (tarea: ITarea) => {
        setTareas([...tareas, tarea]);
    }

    const onFinalizar = (id: Number) => {
        setTareas(prev => prev.map(tarea => tarea.id === id ?
            { ...tarea, estado: 'Finalizado' } : tarea))
    }

    const onEliminar = (id: Number) => {
        setTareas(prev => prev.filter(tarea => tarea.id !== id));
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
        </>
    )
};

export default ListaTareas;