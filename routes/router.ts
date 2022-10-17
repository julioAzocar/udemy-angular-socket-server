import { Router, Request, Response} from 'express';
import Server from '../classes/server';

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

export default router;