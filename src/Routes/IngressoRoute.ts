import express, { Router } from 'express';
import { IngressoController } from '../Controllers/IngressoController';
import { IngressoRepository } from '../Repositories/IngressoRepository';

export function createIngressoRouter(ingressoRepository: IngressoRepository): Router {
    const router = express.Router();
    const ingressoController = new IngressoController(ingressoRepository);
   
    router.post('/', (req, res) => ingressoController.criarIngresso(req, res));
    router.get('/', (req, res) => ingressoController.obterIngressos(req, res));
    router.get('/:id', (req, res) => ingressoController.obterIngresso(req, res));
    router.put('/:id', (req, res) => ingressoController.atualizarIngresso(req, res));
    router.delete('/:id', (req, res) => ingressoController.excluirIngresso(req, res));
  
    return router;
  }