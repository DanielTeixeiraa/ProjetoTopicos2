import express, { Router } from 'express';
import { CompraController } from '../Controllers/CompraController';
import { CompraRepository } from '../Repositories/CompraRepository';

export function createCompraRouter(compraRepository: CompraRepository): Router {
    const router = express.Router();
    const compraController = new CompraController(compraRepository);
   
    router.post('/', (req, res) => compraController.criarCompra(req, res));
    router.get('/', (req, res) => compraController.obterCompras(req, res));
    router.get('/:id', (req, res) => compraController.obterCompra(req, res));
    router.put('/:id', (req, res) => compraController.atualizarCompra(req, res));
    router.delete('/:id', (req, res) => compraController.excluirCompra(req, res));
  
    return router;
  }