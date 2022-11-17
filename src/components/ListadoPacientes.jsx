import { useEffect } from "react"
import Paciente from "./Paciente"

const ListadoPacientes = ( {pacientes, setPaciente, eliminarPaciente} ) => {

  return (
    <div className="md:w-1/2  lg:w-3/5 md:h-screen md:overflow-y-scroll">

      {/* Para validar si hay pacientes, si no, muestra un texto determinado */}

        {pacientes && pacientes.length ?
        <>
            
            <h2 className="text-center text-3xl font-black">Listado Pacientes</h2>
            <p className="text-xl text-center mt-5 mb-7">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
            </p>

            {pacientes.map( pacient => 
                  (
                    //para acceder a los valores del arreglo,y luego del objeto
                    //<h1>{paciente.nombre}</h1>

                    //como queremos crear un div con los datos, usamos el componente paciente y le pasamos las props
                    <Paciente 
                          key = {pacient.id}
                          pacient = {pacient}
                          setPaciente = {setPaciente}
                          eliminarPaciente = {eliminarPaciente}
                    />
                  )
              )
            }
        </>
          : (
            //si el largo del array pacientes es 0 se muestra esto, hasta que cambie el state del array pacientes
              <>
                <h2 className="text-center text-3xl font-black">No hay Pacientes</h2>
                <p className="text-xl text-center mt-5 mb-7">
                Agrega nuevos pacientes{" "}
                <span className="text-indigo-600 font-bold">y se verán aquí</span>
                </p>
                
              </>
          )}
         
    </div>
        
       

      
  )
}

export default ListadoPacientes
