import { Router } from "express";
import passport from "passport";
import User from '../models/User.js';


const router = Router();

router.get('/pasajero', (req, res) => {
    res.render('pasajero');
});

router.get('/conectar', (req, res) => {
    res.render('viaje');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/viaje',
    failureRedirect: '/pasajero',
    failureFlash: true
}));

function validaRut(rutCompleto) {
    rutCompleto = rutCompleto.replace("-", "-");
    if (!/^[0-9]+[-|-]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    let tmp = rutCompleto.split("-");
    let digv = tmp[1];
    let rut = tmp[0];
    if (digv == "K") digv = "k";

    return dv(rut) == digv;
};

function dv(T) {
    let M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - M++ % 6)) % 11;
    return S ? S - 1 : "k";
};

//agregar usuario BD
router.post('/agregar', async (req, res) => {
    const { name, correo, password, confirm_password, sexo } = req.body;
    let rut = '';
    if (req.body && req.body.rut) {
        rut = req.body.rut;
    }
    let errors = [];
    console.log(req.body);
    if (name === '' || rut === '' || correo === '' || sexo === '') {
        errors.push({ text: 'Todos los campos son obligatorios' });
    }
    if (validaRut(rut)) {
        console.log('RUT válido');
    } else {
        errors.push({ text: 'RUT no válido'});
    }
    if (password !== confirm_password) {
        errors.push({ text: 'Contraseñas no coinciden' });
    }
    if (password.length < 4 || password.length > 8) {
        errors.push({ text: 'La contraseña debe ser al menos entre 4 y 8 caracteres' });
    }
    if (errors.length > 0) {
        res.render('pasajero', { errors, name, rut, correo, password, confirm_password, sexo });
    } else {
        const emailUser = await User.findOne({ correo: correo });
        if (emailUser) {
            res.redirect('/pasajero');
        }
        const newUser = new User({ name, rut, correo, password, confirm_password, sexo });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect('/pasajero');
    }
});


router.get('/admin.hbs', async (req, res) => {
    const users = await User.find().lean()
    res.render('admin', { users: users })
});

router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean()
        res.render('edit-pasajero', { user });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.post('/edit/:id', async (req, res) => {

    const { id } = req.params;

    await User.findByIdAndUpdate(id, req.body);

    res.redirect("/admin.hbs");
});

router.get('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/admin.hbs");
});




export default router;