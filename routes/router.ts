import { Router, Request, Response} from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request,res: Response) =>{

    res.json({
        ok: true,
        mensaje: 'get-Todo esta bien!!'
    })
});

router.post('/mensajes', (req: Request,res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {de,cuerpo};

    const server = Server.instance; //singleton es la unica instancia 
    server.io.emit('mensaje-nuevo', payload);//mensaje a todos

    res.json({
        ok: true,
        cuerpo,
        de,
        mensaje: 'post-mundo esta bien!!'
    })
});

router.post('/mensajes/:id', (req: Request,res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id; //id de url


    const payload = {de,cuerpo};

    const server = Server.instance; //singleton es la unica instancia 
    server.io.in( id ).emit('mensaje-privado', payload);//mensaje privado
    //server.io.emit('mensaje-mundo', payload);//mensaje a todos

    res.json({
        ok: true,
        cuerpo,
        de,
        id,
        mensaje: 'post-id-Todo esta bien!!'
    })
});

//servicioobtener todos los id de usuarios
router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});



//servicioobtener todos los id y nombres de usuarios
router.get('/usuarios/detalle',(req:Request,res:Response)=>{

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })

});


export default router;