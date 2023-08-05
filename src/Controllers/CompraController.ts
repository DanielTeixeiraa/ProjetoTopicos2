import { Request, Response } from "express";
import { CompraRepository } from "../Repositories/CompraRepository";
import { Compra } from "../Models/Compra";

export class CompraController {
    constructor(private compraRepository: CompraRepository) { }

    async criarCompra(req: Request, res: Response) {
        try {
            const compra = req.body as Compra;
            const novaCompra = await this.compraRepository.criarCompra(compra);
            res.status(201).json(novaCompra);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel criar compra' });
        }
    }

    async obterCompras(req: Request, res: Response) {
        try {
            const compras = await this.compraRepository.obterCompras();
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter compras' });
        }
    }

    async obterCompra(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const compra = await this.compraRepository.obterCompra(id);

            if (compra) {
                res.status(200).json(compra);
            } else {
                res.status(404).json({ error: 'Compra nao encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter compra' });
        }
    }

    async atualizarCompra(req: Request, res: Response) {
        try {
            const compra = req.body as Compra;
            const compraAtualizada = await this.compraRepository.atualizarCompra(compra);

            if (compraAtualizada === null) { // Verifica se o compra foi encontrado
                res.status(404).json({ error: 'Compra nao encontrada' });
            } else {
                res.status(200).json(compraAtualizada);
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel atualizar compra' });
        }
    }

    async excluirCompra(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const compraExcluida = await this.compraRepository.excluirCompra(id);

            if (compraExcluida) {
                res.status(200).json({ message: 'Compra excluida com sucesso' });
            } else {
                res.status(404).json
                    ({ error: 'Compra nao encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir compra' });
        }
    }
}
