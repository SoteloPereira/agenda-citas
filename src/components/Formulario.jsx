//Simplificacion de la definicion de un componente
//ya que siempre requiere function, nombre, return y el export
// al instalar la extension ES7 ... al colocar rfce nos crea el codigo del componente

//Importamos los hooks usestate y useEffect directo de React
import { useState, useEffect } from "react"
//importamos el componente Error para el mensaje de campos vacios
import Error from "./Error" //y lo llamamos en el espacio de jsx de error

//Aqui lo declaramos como function expression (arrow function) en cambio Header como function declaration
//editar - recibe el objeto paciente desde App
const Formulario = ( { pacientes, setPacientes, paciente,setPaciente}) => {

  //declaramos el useState
  const [nombre, setNombre] = useState("")
  const [dueno, setDueno] = useState("")
  const [email, setEmail] = useState("")
  const [alta, setAlta] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [error,setError] = useState(false)

  //reglas para utilizar/declarar/inicializar los hooks
  /* 
  - Deben ir en la parte superior del componente
  - No deben ir dentro de condicionales ni despues de return (de algo que retorne algo)
  
  Eventos en React
  -Se escriben en camelCase
  
  //Props - Propiedades
  -Los state o funciones creadas en un componente solo estarán disponibles allí 
  Con props podemos pasarlas entre componentes, pero siempre del Padre al Hijo
  no podria pasar un state desde Formulario hacia App, por eso siempre colocarlo en archivo principal
  Sintaxis: <Formulario nombreProp = { variable o fn } />
  se le puede pasar cualquier tipo de dato
  */

    //useEffect 
  /*
  - es un callback, siempre tendra un arrow fn dentro
  - se ejecutan instrucciones cuando cambia un state o cuando el componente esta listo
  - se utiliza para poner codigo de consulta a API o de LocalStorage
  - se le puede declarar una dependencia, que escucha cambios que sucedan en algo (variable, state, etc) y actualiza
  el componente cuando eso sucede 
  */

  useEffect( () =>{
    //validamos que objeto no este vacio, luego usamos el modificador de los state asociados al formulario
    if( Object.keys(paciente).length > 0){
      //se le debe poner el objeto para que tome el valor
        setNombre(paciente.nombre)
        setDueno(paciente.dueno)
        setEmail(paciente.email)
        setAlta(paciente.alta)
        setSintomas(paciente.sintomas)
    }

  },[paciente]) //se le indica dependencia de pacientes, es decir cuando cambie eso, se ejecutará lo de adentro


  const handleSubmit = (e) =>{
    e.preventDefault();

    //validacion del formulario
    if( [nombre, dueno, email, alta, sintomas].includes('') )
    {
      console.log("Hay al menos un campo vacio");
      //lo cambia a true, por lo que muestra el modal
      setError(true)
      return;1
    }
    //lo cambiamos a false, para que se borre el minimodal de error
    setError(false)

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fech = Date.now().toString(36)
        return fech + random
  }

    //vamos a construir un objeto con los datos de cada paciente
    const objetoPaciente = {
        nombre, //aqui decimos abreviado que nombre: nombre
        dueno,
        email,
        alta,
        sintomas
        //le sacamos el id al objeto de base, para asignarselo cuando se captan los datos del form
        //id: generarId()
    }

    if ( paciente.id ) {
      //Editando el registro
      //ya teniendo el id al momento de crearse, se le agrega al objeto
      objetoPaciente.id = paciente.id
      console.log(objetoPaciente);
      console.log(paciente);
      //objetoPaciente viene siendo el nuevo, y el paciente el antiguo
      const pacientesActualizados = pacientes.map( 
                //pacienteState para comparar con los elementos(id de objetos) del array pacientes  
                      pacienteState => pacienteState.id === paciente.id ?
                      objetoPaciente : pacienteState)
      //modificamos el array origen con los pacientes actualizados, ya sea con los mismos valores
      //o con la modificacion al paciente
      setPacientes(pacientesActualizados)
      //para limpiar objeto "antiguo"
      setPaciente({})

    }else{
      //aqui le asignamos el id al objeto
      objetoPaciente.id = generarId()
      //estoy usando el modificador declarado en el padre(App), se puede ver el cambio
      //le pasamos el objeto con los datos del paciente -  //setPacientes( objetoPaciente)
      /*como necesitamos ir agregando los nuevos pacientes a los que ya existen, nos traemos los pacientes
      y por medio del spread, "concatenamos" lo anterior y lo nuevo*/
      setPacientes([...pacientes, objetoPaciente])
    }
    

    //Reiniciar el formulario luego de que se ingresa dejando valores de state ''
    setNombre('')
    setDueno('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 ml-3 mr-3">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 mb-7 text-center">
          Añade pacientes y {""}
          <span className= "text-indigo-600 font-bold " >Administralos</span>
        </p>
        <form 
        // definimos que hará el evento onSubmit del form
        onSubmit={handleSubmit}
        className="bg-white py-10 shadow-md rounded-lg px-5 mb-10 mt-5">

{/* creamos un div(mini modal) que se muestre en caso de que error (falte un campo) */}
          {error && <Error 
          //le pasamos una prop al componente Error
                        mensaje='Todos los campos son obligatorios'
                    />
            //vamos a mover esto a un componente (Error.jsx), para poder reutilizarlo despues
            // <div className="bg-red-800 text-white p-3 text-center rounded-md font-bold mb-3 uppercase"> 
            //     <p>Todos los campos son obligatorios</p>
            // </div>
          }

            <div className="mb-5">
              <label for="nombre" className="block font-bold uppercase text-gray-700">Nombre mascota</label>
              <input className="border-2 w-full p-2 placeholder-gray-400 mt-2 outline-indigo-600 rounded-md"
              type="text" id="nombre"
              placeholder="Nombre de la mascota"
              value={nombre}
              //onChange es como un addEventListener, para cuando digitas
              onChange={ (e) => setNombre(e.target.value)}/>
              {/* y llamamos al modificador del state */}
            </div>
            

            <div className="mb-5">
              <label for="nombreDueno" className="block font-bold uppercase text-gray-700">Nombre dueño</label>
              <input className="border-2 w-full p-2 placeholder-gray-400 mt-2 outline-indigo-600 rounded-md"
              type="text" id="nombreDueno"
              placeholder="Nombre del dueño"
              value={dueno}
              onChange={ (e) => setDueno(e.target.value)}/>
            </div>

            <div className="mb-5">
              <label for="email" className="block font-bold uppercase text-gray-700">Email contacto</label>
              <input className="border-2 w-full p-2 placeholder-gray-400 mt-2 outline-indigo-600 rounded-md"
              type="email" id="email"
              placeholder="Email"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-5">
              <label for="alta" className="block font-bold uppercase text-gray-700">Fecha Alta</label>
              <input className="border-2 w-full p-2 placeholder-gray-400 mt-2 outline-indigo-600 rounded-md"
              type="date" id="alta"
              value={alta}
              onChange={ (e) => setAlta(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label for="sintomas" className="block font-bold uppercase text-gray-700">síntomas</label>
              <textarea name="sintoma" id="sintomas" cols="30" rows="10" placeholder="Describa los síntomas"
              className="border-2 w-full p-2 max-h-20 placeholder-gray-400 mt-2 outline-indigo-600 rounded-md"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value)}
              ></textarea>
            </div>

            <input type="submit"
              className="bg-indigo-600 w-full p-3 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-all" 
              //luego de que cargamos los datos en los campos, validamos que el objeto tenga un id
              //y luego modificamos el texto del boton para poder editar
              value={ paciente.id ? "Editar paciente" : "Agregar paciente" }/>
        </form>
        
    </div>
  )
}

export default Formulario

