import express from 'express'; //npm install @types/express --save-dev
import { SERVER_PORT } from '../global/environment';

export default class server {

    public app: express.Application;
    public port: number;

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    start( callback: Function ){
        this.app.listen( this.port, callback() );

    }
}