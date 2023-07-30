import express, { Router } from 'express';
import { UsuarioController } from '../Controllers/UsuarioController';
import { UsuarioRepository } from '../Repositories/UsuarioRepository';

export function createUsuarioRouter(usuarioRepository: UsuarioRepository): Router {
    const router = express.Router();
    const usuarioController = new UsuarioController(usuarioRepository);
   
    router.post('/', (req, res) => usuarioController.criarUsuario(req, res));
    router.get('/', (req, res) => usuarioController.obterUsuarios(req, res));
    router.get('/:id', (req, res) => usuarioController.obterUsuario(req, res));
    router.put('/:id', (req, res) => usuarioController.atualizarUsuario(req, res));
    router.delete('/:id', (req, res) => usuarioController.excluirUsuario(req, res));
  
    return router;
  }