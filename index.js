const express = require("express");
const app = express();
const dotenv = require('dotenv');
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const handlebars = require("express-handlebars");
const store = new session.MemoryStore();


dotenv.config();

//DATABASE
const database = require("./database/database");

//JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HANDLEBARS
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set("view engine", 'handlebars')

const secret = process.env.SECRET

//SESSÂO

app.use(session({
    secret,
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 30000},
    store
}));


app.use(flash())
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));



// CONTROLLER
const user_session = require('./controller/user_session_controller');
console.log(store)
app.use("/", user_session)


const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Servidor rodando na porta 3000 na URL: http://localhost:3000');
});
