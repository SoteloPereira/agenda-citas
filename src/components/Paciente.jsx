//este componente, recibe props (array) desde listado de pacientes, 
//que a su vez recibe props (array de Paciente) de App.jsx que tiene el state principal
//eliminar - recibimos la fn eliminarPaciente desde Listado y la usamos en click del boton
const Paciente = ({pacient, setPaciente, eliminarPaciente}) => {
            //editar - recibimos el mod del objeto declarado en App para cargar los datos en el formulario
        console.log(pacient);

        //podemos destructurarlo para hacer mas limpio el codigo en los datos y usar las variables
        const {nombre, dueno, email, alta, sintomas,id } = pacient

        //fn llamada desde click para eliminar, que dentro llama a la fn de App
        const handleEliminar = () => {
            const responder = confirm(`Deseas realmente eliminar el paciente ${nombre}`)
            if (responder) eliminarPaciente(id)
        }

  return (
    <div className="w-1/2 md:w-full ">
        <div className="m-3 bg-white shadow-md px-5 py-10 w-full rounded-xl text-gray-700">
        <p className="font-bold mb-3 uppercase">Nombre: {""}
            {/* con la destructuracion podemos usar la variable obtenida del arreglo "paciente" */}
            <span className="font-normal normal-case">{nombre}</span>
        </p>

        <p className="font-bold mb-3 uppercase">Propietario: {""}
            <span className="font-normal normal-case">{dueno}</span>
        </p>

        <p className="font-bold mb-3 uppercase">Email: {""}
            <span className="font-normal normal-case">{email}</span>
        </p>

        <p className="font-bold mb-3 uppercase">Fecha Alta: {""}
            <span className="font-normal normal-case">{alta}</span>
        </p>

        <p className="font-bold mb-3 uppercase">Síntomas: {""}
            <span className="font-normal normal-case">{sintomas}</span>
        </p>
        <div className="flex justify-evenly mt-5">
            <button type="button"
                className="bg-indigo-700 text-white font-bold uppercase rounded-md px-5 py-2"
                //editar - al hacer click, modificamos el state del objeto de App para cargar datos
                //como le estamos pasando un parametro, se escribe como callback con arrow function, si no se puede dejar solo la funcion (modificador en este caso)
                onClick={ () => setPaciente(pacient)}
            >
                Editar
            </button>
            <button type="button"
                className="bg-red-700 text-white font-bold uppercase rounded-md px-5 py-2"
                //en la destructuracion inicialmente no pasamos el id, debemos agregarlo
                    //onClick={ () => eliminarPaciente(pacient.id) }
                //podemos hacerlo agregando una confirmacion desde la fn handleEliminar
                onClick={handleEliminar}
            >
                Eliminar
            </button>
        </div>
    </div>
</div>
  )
}

export default Paciente
