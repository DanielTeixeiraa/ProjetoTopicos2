// src/route/eventoRoute.ts
import express, { Router } from 'express';
import { EventoController } from '../Controllers/EventoController';
import { EventoRepository } from '../Repositories/EventoRepository';

export function createEventoRouter(eventoRepository: EventoRepository): Router {
    const router = express.Router();
    const eventoController = new EventoController(eventoRepository);
   
    router.post('/', (req, res) => eventoController.criarEvento(req, res));
    router.get('/', (req, res) => eventoController.obterEventos(req, res));
    router.put('/:id', (req, res) => eventoController.atualizarEvento(req, res));
    router.delete('/:id', (req, res) => eventoController.excluirEvento(req, res));
  
    return router;
  }