/** @type {import('tailwindcss').Config} */
module.exports = {
  //aqui indicamos que archivos van a ser parte de la presentacion del proyecto
  //con ./src/**/*.jsx le indicamos que busque en todas las carpetas los archivos de react .jsx
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}
