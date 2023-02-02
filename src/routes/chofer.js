import { Router } from "express";
import Chofer from '../models/Chofer.js'

const router = Router();

router.get('/chofer', (req, res) => {
    res.render('chofer');
});

router.get('/apigoogle', (req, res) => {
    res.render('apigoogle')
})

//Agregar chofer
router.post('/agregar/chofer', async (req, res) => {
    const { name, rut, patente, marca, moelo, fecha, password, confirm_password } = req.body;
    let errors = [];
    console.log(req.body);
    if (!name) {
        errors.push({ text: 'Porfavor ingresar su nombre' });
    }
    if (password !== confirm_password) {
        errors.push({ text: 'Contraseñas no coinciden' });
    }
    if (password.length < 6) {
        errors.push({ text: 'La contraseña debe ser de almenos 6 caracteres' });
    }
    if (errors.length > 0) {
        res.render('chofer', { errors, name, rut, patente, marca, moelo, fecha, password, confirm_password });
    } else {
        const rutChofer = await Chofer.findOne({ rut: rut });
        if (rutChofer) {
            res.redirect('/chofer');
        }
        const newChofer = new Chofer({ name, rut, patente, marca, moelo, fecha, password, confirm_password });
        newChofer.password = await newChofer.encryptPassword(password);
        await newChofer.save();
        res.redirect('/chofer');
    }
});

router.get('/admin-chofer.hbs', async (req, res) => {
    const chofers = await Chofer.find().lean()
    res.render('admin-chofer', { chofers: chofers })
});


router.get('/chofer/edit/:id', async (req, res) => {
    try {
        const chofer = await Chofer.findById(req.params.id).lean()
        res.render('edit-pasajero', { chofer });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.post('/chofer/edit/:id', async (req, res) => {

    const { id } = req.params;

    await Chofer.findByIdAndUpdate(id, req.body);

    res.redirect("/admin.hbs");
});

router.get('/chofer/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    await Chofer.findByIdAndDelete(id);
    res.redirect("/admin.hbs");
});

export default router;