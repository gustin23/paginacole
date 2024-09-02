import  express  from "express";
import  cookieParser  from "cookie-parser";
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js"

//Server
const app = express();
app.set("port",3001);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());


//Rutas
/*Agregar rutas para el kisco y las materias*/

app.get("/",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
/*Usar este para cambiar contra*/app.get("/register",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.post("/api/change-password", authentication.changePassword);

app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authentication.login);
