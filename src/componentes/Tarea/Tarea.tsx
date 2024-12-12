import { FC } from "react";
import ITarea from "../../interfaces/ITarea";
import { useTareasContext } from "../../context/Tarea/TareaProvider";

interface ITareaProps {
    tarea: ITarea,
    index: number
};

const Tarea: FC<ITareaProps> = ({ tarea, index }) => {

    const { onFinalizar, onEliminar } = useTareasContext();
    return (
        <li key={index.toString()}>
            <div className="task-header">
                <h3>{tarea.nombre}</h3>
                <div className={`task-status ${tarea.estado?.toLowerCase()}`}>
                    {tarea.estado}
                </div>
            </div>
            <p><strong>Descripción:</strong> {tarea.descripcion}</p>
            <p><strong>Fecha de vencimiento:</strong> {tarea.fecha.toUTCString()}</p>
            <div className="acciones">
                {tarea.estado !== 'Finalizado' && <button className="finalizar" onClick={() => onFinalizar(tarea.id)}>Finalizar</button>}
                <button className="eliminar" onClick={() => onEliminar(tarea.id)}>Eliminar</button>
            </div>
        </li>
    )
};

export default Tarea;