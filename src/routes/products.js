import express from 'express';
import upload from '../services/uploader.js';
import Manager from '../contenedores/manager.js';
import {authMiddleware} from '../utils.js';
import __dirname from '../utils.js';
import {productos} from '../daos/index.js'
const router = express.Router();
const manager = new Manager(); 

//GET
router.get('/', (req,res) => {

    productos.getAll().then(result => {
        let arreglo = result.products;
        console.log(result)
        if(arreglo){
            res.send({usuarios:arreglo});
        }
        else{
            res.status(404).send({message: "No se encuentro producto "})
        }
    })
})

router.get('/:pid',(req,res) => {
    let id = req.params.pid;
    id = parseInt(id);
    manager.getproductById(id).then(result => {
        res.send(result);
    })
})

//POST
router.post('/', (req,res) => {
    let cuerpo = req.body;
    console.log(cuerpo)
    productos.saveOne(cuerpo).then(result => {
        res.send(result);
    })
})

//POST anterior
// router.post('/',authMiddleware, upload.single('image'), (req,res) => {
//     let file = req.file;
//     let cuerpo = req.body;
//     cuerpo.precio = parseInt(cuerpo.precio)
//     cuerpo.stock = parseInt(cuerpo.stock)
//     cuerpo.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
//     manager.save(cuerpo).then(result => {
//         res.send(result);
//     })
// })

//PUT
router.put('/:pid',authMiddleware,(req,res) => {
    let id = parseInt(req.params.pid);
    let body = req.body;
    manager.updateProducto(id,body).then(result => {
        res.send(result);
    })
})

//DELETE
router.delete('/:pid',authMiddleware,(req,res) => {
    let id = parseInt(req.params.pid);
    manager.deleteById(id).then(result => {
        res.send(result);
    })
})

export default router;