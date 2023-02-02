import { Router } from "express";
import Rutas from "../models/Rutas.js";



const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/sesion', (req, res) => {
    res.render('sesion');
});



router.post('/agregar/viaje', async (req, res) => {
    const { corigen, dorigen, cdestino, ddestino} = req.body;
    const errors = [];
    console.log(req.body);
    if(!corigen) {
        errors.push({text: 'Por favor ingrese comuna de origen'});
    }
    if(!dorigen) {
        errors.push({text: 'Por favor ingrese direccion de origen'});
    }
    if(!cdestino) {
        errors.push({text: 'Por favor ingrese comuna de destino'});
    }
    if(!ddestino) {
        errors.push({text: 'Por favor ingrese direccion de destino'});
    }
    if(errors.length > 0) {
        res.render('ruta', {
            errors,
            corigen,
            dorigen,
            cdestino,
            ddestino
        });
    } else {
        const newRuta = new Rutas({ corigen, dorigen, cdestino, ddestino });
        await newRuta.save();
        res.redirect('/admin-rutas.hbs')
    }
});

router.get('/viaje.hbs', async (req, res) => {
    const rutas = await Rutas.find().lean()
    console.log(rutas);
    res.render('viaje', { rutas: rutas })
});

router.get('/admin-rutas.hbs', async (req, res) => {
    const rutas = await Rutas.find().lean()
    res.render('admin-rutas', { rutas: rutas })
});

router.get('/mapa.hbs', async (req, res) => {
    const rutas = await Rutas.find().lean()
    res.render('mapa', { rutas: rutas })
});


router.get('/mapa/:id', async (req, res) => {
    const id = req.params.id;
    const ruta = await Rutas.findById(id).lean();
    res.render('mapa', { ruta });
});

router.get('/viaje', (req, res) => {
    res.render('viaje');
});

router.get('/ruta', (req, res) => {
    res.render('ruta');
});



export default router;