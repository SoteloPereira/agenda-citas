//Un componente es una funcion

//Lo creamos y luego de eso hay que importarlo desde el componente principal (App.jsx)

//Aqui lo declaramos como function declaration en cambio Formulario con function expression (arrow function)
//indicamos que recibe props desde el padre (App)
//podriamos tambien destructurar e indicar las props
    //function Header(props){
function Header( {numeros, toma1Valor}){

    console.log(numeros);

    const param = "un param"
    //lo que se puede hacer es crear una fn en padre (App) que espere un param
    //pasarse por props al hijo (Header) y llamarla aca
    //al ya tenerla destructurada, podriamos llamar la funcion
    toma1Valor(param) //y veremos el resultado 



    return (
        <>
            <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
                Seguimiento pacientes {""}
                <span className="text-indigo-600">Veterinaria</span>
            </h1>
        </>
    )
}

//lo exportamos para que lo pueda ver desde App
export default Header