import { Request, Response } from "express";
import { CarrinhoRepository } from "../Repositories/CarrinhoRepository";
import { Carrinho } from "../Models/Carrinho";

export class CarrinhoController {
    constructor(private carrinhoRepository: CarrinhoRepository) { }

    async criarCarrinho(req: Request, res: Response) {
        try {
            const carrinho = req.body as Carrinho;
            const novoCarrinho = await this.carrinhoRepository.criarCarrinho(carrinho);
                res.status(201).json(novoCarrinho);

        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel criar carrinho' });
        }
    }

    async obterCarrinhos(req: Request, res: Response) {
        try {
            const carrinhos = await this.carrinhoRepository.obterCarrinhos();
                res.status(200).json(carrinhos);

        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter carrinhos' });
        }
    }

    async obterCarrinho(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const carrinho = await this.carrinhoRepository.obterCarrinho(id);

            if (carrinho) {
                res.status(200).json(carrinho);
            } else {
                res.status(404).json({ error: 'Carrinho nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter carrinho' });
        }
    }

    async atualizarCarrinho(req: Request, res: Response) {
        try {
            const carrinho = req.body as Carrinho;
            const carrinhoAtualizado = await this.carrinhoRepository.atualizarCarrinho(carrinho);

            if (carrinhoAtualizado === null) { // Verifica se o carrinho foi encontrado
                res.status(404).json({ error: 'Carrinho nao encontrado' });
            } else {
                res.status(200).json(carrinhoAtualizado);
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel atualizar carrinho' });
        }
    }

    async excluirCarrinho(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const carrinhoExcluido = await
                this.carrinhoRepository.excluirCarrinho(id);

            if (carrinhoExcluido) {
                res.status(200).json({ message: 'Carrinho excluido com sucesso' });
            }
            else {
                res.status(404).json({ error: 'Carrinho nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir carrinho' });
        }
    }
}
