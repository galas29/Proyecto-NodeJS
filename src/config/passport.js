import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from '../models/User.js'

passport.use(new LocalStrategy({
  usernameField: 'correo',
  passwordField: 'password'
}, async (username, password, done) => {
  const user = await User.findOne({ username: username });
  if (!user) {
      return done(null, false, { message: "Usuario no encontrado" });
  } else {
      const match = user.matchPassword(password);
      if (match) {
          return done(null, user);
      } else {
          return done(null, false, {message: "Contraseña incorrecta"});
      }
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
