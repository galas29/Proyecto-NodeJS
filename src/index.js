import express from "express";
import path from "path";
import methodOverride from "method-override";
import session from "express-session";
import { create } from "express-handlebars";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import flash from "connect-flash";
import passport from "passport";


import indexRoutes from "./routes/index.js";
import usersRoutes from "./routes/users.js";
import conductorRoutes from "./routes/chofer.js";
import "./config/passport.js";




// Inicializacion
const app = express()
import './database.js'
const __dirname = dirname(fileURLToPath(import.meta.url));


//Settings
app.set('port', process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    create({
      helpers:{toString: function(value)
      {
        return value.toString();
      }},
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      defaulLayout: "main",
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", ".hbs");

//Middlewares ejecutadas antes que lleguen a las rutas
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));//permite usar el put o delete
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//Routes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(conductorRoutes);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server esta escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})