// Función para codificar a Base64
function toBase64(str) {
    return Buffer.from(str, 'utf-8').toString('base64');
}

// Función para decodificar de Base64
function fromBase64(str) {
    return Buffer.from(str, 'base64').toString('utf-8');
}

const user = {
    user: "admin",
    password: toBase64(encryptVigenere("123", "clave")) // La contraseña precreada encriptada con Vigenere y codificada en Base64
};

// Función de login
async function login(req, res) {
    const { username, password } = req.body;  // Asegúrate de que el nombre de usuario se reciba del cuerpo de la solicitud

    // Decodificamos de Base64 y desencriptamos la contraseña almacenada
    const decryptedPassword = decryptVigenere(fromBase64(user.password), "clave");
    
    console.log("Usuario recibido para login:", username);
    console.log("Contraseña recibida para login:", password);
    console.log("Contraseña almacenada encriptada (Base64):", user.password);
    console.log("Contraseña almacenada desencriptada:", decryptedPassword);

    // Verificamos si el usuario y la contraseña coinciden
    if (username === user.user && password === decryptedPassword) {
        console.log("Login exitoso.");
        return res.status(200).send({ status: "Success", message: "Login exitoso" });
    } else {
        console.log("Error: Credenciales incorrectas.");
        return res.status(401).send({ status: "Error", message: "Credenciales incorrectas" });
    }
}

// Función de registro (cambio de contraseña)
async function register(req, res) {
    console.log(req.body);
    const password = req.body.password;
    if (!password) {
        console.log("Error: Los campos están vacíos.");
        return res.status(400).send({ status: "Error", message: "Los campos están vacíos" });
    }
    if (password.length < 4) {
        console.log("Error: La contraseña debe tener al menos 4 caracteres.");
        return res.status(400).send({ status: "Error", message: "La contraseña debe tener al menos 4 caracteres" });
    }

    // Encriptamos la nueva contraseña, la codificamos en Base64 y la guardamos
    const encryptedPassword = toBase64(encryptVigenere(password, "clave"));
    console.log("Contraseña nueva sin encriptar:", password);
    console.log("Contraseña nueva encriptada (Base64):", encryptedPassword);
    
    user.password = encryptedPassword;
    
    return res.status(200).send({ status: "Success", message: "Contraseña cambiada exitosamente" });
}

// Exportamos los métodos
export const methods = {
    login,
    register
};

// Funciones de cifrado y descifrado
function encryptVigenere(plainText, key) {
    let encryptedText = "";
    for (let i = 0; i < plainText.length; i++) {
        const charCode = plainText.charCodeAt(i);
        const keyCode = key.charCodeAt(i % key.length);
        const encryptedChar = String.fromCharCode((charCode + keyCode) % 256);
        encryptedText += encryptedChar;
    }
    console.log(`Texto plano: ${plainText} | Texto encriptado: ${encryptedText}`);
    return encryptedText;
}

function decryptVigenere(encryptedText, key) {
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        const keyCode = key.charCodeAt(i % key.length);
        const decryptedChar = String.fromCharCode((charCode - keyCode + 256) % 256);
        decryptedText += decryptedChar;
    }
    console.log(`Texto encriptado: ${encryptedText} | Texto desencriptado: ${decryptedText}`);
    return decryptedText;
}
