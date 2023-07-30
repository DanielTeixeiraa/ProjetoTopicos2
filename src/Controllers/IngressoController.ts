import { Request, Response } from "express";
import { Ingresso } from "src/Models/Ingresso";
import { IngressoRepository } from "src/Repositories/IngressoRepository";

export class IngressoController {
    constructor(private ingressoRepository: IngressoRepository) { }

    async criarIngresso(req: Request, res: Response) {
        try {
            const ingresso = req.body as Ingresso;
            const novoIngresso = await this.ingressoRepository.criarIngresso(ingresso);
            res.status(201).json(novoIngresso);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel criar ingresso' });
        }
    }

    async obterIngressos(req: Request, res: Response) {
        try {
            const ingressos = await this.ingressoRepository.obterIngressos();
            res.status(200).json(ingressos);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter ingressos' });
        }
    }

    async obterIngresso(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const ingresso = await this.ingressoRepository.obterIngresso(id);

            if (ingresso) {
                res.status(200).json(ingresso);
            } else {
                res.status(404).json({ error: 'Ingresso nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter ingresso' });
        }
    }

    async atualizarIngresso(req: Request, res: Response) {
        try {
            const ingresso = req.body as Ingresso;
            const ingressoAtualizado = await this.ingressoRepository.atualizarIngresso(ingresso);

            if (ingressoAtualizado === null) { // Verifica se o ingresso foi encontrado
                res.status(404).json({ error: 'Ingresso nao encontrado' });
            } else {
                res.status(200).json(ingressoAtualizado);
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel atualizar ingresso' });
        }
    }

    async excluirIngresso(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const ingressoExcluido = await this.ingressoRepository.excluirIngresso(id);

            if (ingressoExcluido) {
                res.status(200).json({ message: 'Ingresso excluido com sucesso' });
            } else {
                res.status(404).json({ error: 'Ingresso nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir ingresso' });
        }
    }
}
