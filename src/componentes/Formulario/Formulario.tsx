import { FC } from "react";
import ITarea from "../../interfaces/ITarea";
import { FormularioGenerico } from "../FormularioGenerico/FormularioGenerico";
import IFormField from "../../interfaces/IFormField";
import { useTareasContext } from "../../context/Tarea/TareaProvider";

interface IFormularioProps {

};

const Formulario: FC<IFormularioProps> = () => {

    const { agregarTarea } = useTareasContext();

    const initialData: Omit<ITarea, 'id'> = {
        nombre: '',
        descripcion: '',
        estado: 'Planificado',
        fecha: new Date(),
    }

    const formFields: IFormField<Omit<ITarea, 'id'>>[] = [
        {
            name: 'nombre' as const,
            label: 'Nombre de la tarea',
            type: 'text' as const,
            validation: (value: string) => !value.trim()
                ? 'El nombre es requerido' : undefined
        },
        {
            name: 'descripcion' as const,
            label: 'Descripción',
            type: 'textarea' as const,
            validation: (value: string) => !value.trim()
                ? 'La descripción es requerida' : undefined
        },
        {
            name: 'estado' as const,
            label: 'Estado de la tarea',
            type: 'select' as const,
            options: ['Planificado', 'Ejecución', 'Finalizado'],
            validation: (value: string) => !value.trim()
                ? 'El estado es requerido' : undefined
        },
        {
            name: 'fecha' as const,
            label: 'Fecha de la tarea',
            type: 'date' as const,
            validation: (value: string) => !value.toString().trim()
                ? 'La fecha es requerida' : undefined
        },
    ];

    const handleSubmit = (data: Omit<ITarea, 'id'>) => {
        const nuevaTarea: ITarea = {
            ...data,
            id: Date.now().toString(),
            fecha: new Date(`${data.fecha} 00:00:00`)
        }

        agregarTarea(nuevaTarea);
    }

    return (
        <FormularioGenerico<Omit<ITarea, 'id'>>
            initialData={initialData}
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Agregar tarea">
        </FormularioGenerico >
    )
};

export default Formulario;