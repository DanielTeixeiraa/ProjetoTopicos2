import { Request, Response } from "express";
import { EventoRepository } from "../Repositories/EventoRepository";
import { Evento } from "../Models/Eventos";

export class EventoController {
    constructor(private eventoRepository: EventoRepository) { }

    async criarEvento(req: Request, res: Response) {
        try {
        const evento = req.body as Evento;
        const novoEvento = await this.eventoRepository.criarEvento(evento);
        res.status(201).json(novoEvento);
        } catch (error) {
        res.status(500).json({error: 'Nao foi possivel criar evento' })
        }
    }

    async obterEventos(req: Request, res: Response) {
        try {
        const eventos = await this.eventoRepository.obterEventos();
        res.json(eventos);
        res.status(200).json(eventos);
        } catch (error) {
            res.status(500).json({error: 'Nao foi possivel obter eventos' })
        }        
    }

    async obterEvento(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const evento = await this.eventoRepository.obterEvento(id);
        if (evento) {
            res.status(200).json(evento);
        } else {
            res.status(404).send();
        }
    }

    async atualizarEvento(req: Request, res: Response) {
        try {
        const evento = req.body as Evento;
        const eventoAtualizado = await this.eventoRepository.atualizarEvento(evento);
        res.status(200).json(eventoAtualizado);
        } catch (error) {
        res.status(500).json({error: 'Nao foi possivel atualizar evento' })
        }
    }

    async excluirEvento(req: Request, res: Response) {
        try {
        const id = parseInt(req.params.id);
        await this.eventoRepository.excluirEvento(id);
        res.status(204).send();
        } catch (error) {
        res.status(500).json({error: 'Nao foi possivel excluir evento' })
        }
    }

}