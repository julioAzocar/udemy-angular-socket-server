import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket) => {
    const usuario = new Usuario( cliente.id);
    usuariosConectados.agregar( usuario );

} 

export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado ');
        //borrar usuario de lista
        const usuario = new Usuario( cliente.id);
        usuariosConectados.borrarUsuario( usuario.id );
    });

}

//escuchar mensaje
export const mensaje = ( cliente: Socket , io : socketIO.Server) => {

    cliente.on('mensaje', ( payload: {de: string, cuerpo: string }) => {
        console.log('Mensaje recibido ', payload);

        io.emit('mensaje-nuevo', payload);

    });

}

//mensaje configurar usuario
export const configurarUsuario = ( cliente: Socket , io : socketIO.Server) => {

    cliente.on('configurar-usuario', ( payload: {nombre: string }, callback: Function) => {
        //console.log('Mensaje configurando usuario ', payload.nombre );

        //io.emit('mensaje-nuevo', payload);
        //respuest en angular

        //agrega nombre de usuario a lista
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
    });

}

