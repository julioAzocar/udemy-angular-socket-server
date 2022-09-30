import { Router, Request, Response} from 'express';

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

    res.json({
        ok: true,
        cuerpo,
        de,
        mensaje: 'post-Todo esta bien!!'
    })
});

router.post('/mensajes/:id', (req: Request,res: Response) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id; //id de url

    res.json({
        ok: true,
        cuerpo,
        de,
        id,
        mensaje: 'post-id-Todo esta bien!!'
    })
});

export default router;