//importamos el componente Header y lo usamos dentro del return siempre con <Componente />
import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

//es el principal porque en Main.jsx esta llamado y entregado como .root
function App()
{
    const [pacientes,setPacientes] = useState([])
    //editar - un objeto con los datos desde el listado
    const [paciente, setPaciente] = useState({})

    //el orden importa, por eso va primero, vamos a ver si hay algo para que lo muestre
    useEffect(() => {
        const obtenerLS = () => {
            //con esto obtenemos lo que haya en localStorage
            const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []; //JSON.parse para transformarlo en array(object)
            console.log(pacientesLS);
            setPacientes(pacientesLS);
        }
        obtenerLS();
    }, []) //sin dependencias se ejecuta SOLO UNA VEZ

    //guardando los pacientes en el localStorage para no perderlos cuando se refresque la pag
    useEffect(()=>{
        console.log("Componente ok o cambio en 'Pacientes'");
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }, [pacientes])


    //creamos fn que recibe id (del paciente) y que es llamada desde Paciente.jsx
    const eliminarPaciente = (id) =>{
        //vamos a usar metodo filter para modificar el arreglo pacientes, todos los que no tengan ese id
        const pacientesRegistrados = pacientes.filter(p =>p.id !== id)
        setPacientes(pacientesRegistrados)
    }

    const toma1Valor= (param) =>{
        console.log(param); }

    //considerar siempre el fragment para poder tener mas de 1 componente o elemento html
    return (
        <div className="container mx-auto mt-10">
            <Header 
            // estamos pasando props desde el padre App a componente Header
                numeros = { 1 } toma1Valor = { toma1Valor}
            />
            <div className="mt-12 md:flex">
                <Formulario 
                //para poder ir agregando los pacientes a los ya existentes
                    pacientes = {pacientes}
                    setPacientes={setPacientes}
                    paciente = {paciente}
                    //para limpiar el objeto "antiguo"
                    setPaciente = {setPaciente}
                />
                <ListadoPacientes 
                    pacientes = {pacientes}
                    //editar - pasamos el modificador, que luego debemos pasarlo a Paciente
                    setPaciente = {setPaciente}
                    eliminarPaciente = {eliminarPaciente}
                />
            </div>
        </div>
    )
}

export default App