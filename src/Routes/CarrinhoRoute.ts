import express, { Router } from 'express';
import { CarrinhoController } from '../Controllers/CarrinhoController';
import { CarrinhoRepository } from '../Repositories/CarrinhoRepository';

export function createCarrinhoRouter(carrinhoRepository: CarrinhoRepository): Router {
    const router = express.Router();
    const carrinhoController = new CarrinhoController(carrinhoRepository);
   
    router.post('/', (req, res) => carrinhoController.criarCarrinho(req, res));
    router.get('/', (req, res) => carrinhoController.obterCarrinhos(req, res));
    router.get('/:id', (req, res) => carrinhoController.obterCarrinho(req, res));
    router.put('/:id', (req, res) => carrinhoController.atualizarCarrinho(req, res));
    router.delete('/:id', (req, res) => carrinhoController.excluirCarrinho(req, res));
  
    return router;
  }