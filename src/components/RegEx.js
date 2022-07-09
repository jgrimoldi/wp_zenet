
const RegEx = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    clave: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+@$!%*?&])[A-Za-z\d@$!%*?+&]{8,}$/, // Minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
}

export default RegEx;