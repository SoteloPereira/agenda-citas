
const Error = ({mensaje}) => {
  return (
 
        <div className="bg-red-800 text-white p-3 text-center rounded-md font-bold mb-3 uppercase"> 
            <p>{mensaje}</p>
        </div>
   
  )
}

//existe otro metodo para pasar las props, es con la palabra reservada children
//children TOMA TODAS las props que se le mandan al componente
//puede ser incluso HTML ademas de props, funciones, variables, etc
//por lo que se recomienda cuando se pasa harto HTML, usar el children y definir
//en el padre todo el codigo (html y mas)
const Error2 = ({children}) => {
    return (
   
          <div className="bg-red-800 text-white p-3 text-center rounded-md font-bold mb-3 uppercase"> 
              {/* aqui no le colocamos el <p></p> porque lo pasamos desde el padre
              codigo en Formulario.jsx
              {error && <Error><p>Todos los campos son obligatorios</p></Error>} */}
              {children}
          </div>
     
    )
  }


export default Error
