import { Carrinho } from "../../src/Models/Carrinho";
import { CarrinhoController } from '../../src/Controllers/CarrinhoController';
import { CarrinhoRepository } from "../../src/Repositories/CarrinhoRepository";
import { Request, Response } from 'express';

describe('CarrinhoController', () => {
    let carrinhoController: CarrinhoController;
    let carrinhoRepository: CarrinhoRepository;

    beforeEach(() => {
        const carrinhoRepositoryMock = {
            criarCarrinho: jest.fn(),
            obterCarrinhos: jest.fn(),
            obterCarrinho: jest.fn(),
            atualizarCarrinho: jest.fn(),
            excluirCarrinho: jest.fn()
        };

        carrinhoRepository = carrinhoRepositoryMock;
        carrinhoController = new CarrinhoController(carrinhoRepository);
    });

    describe('criarCarrinho', () => {
        it('deve retornar 201 quando criar carrinho', async () => {
            const carrinho = {id: 1, idIngressos: [1,2], idUsuario: 1} as Carrinho;
            const req = { body: carrinho } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'criarCarrinho').mockResolvedValue(carrinho);

            await carrinhoController.criarCarrinho(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(carrinho);
        });

        it('deve retornar 500 quando ocorrer erro ao criar carrinho', async () => {
            const carrinho = {id: 1, idIngressos: [1,2], idUsuario: 1} as Carrinho;
            const req = { body: carrinho } as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'criarCarrinho').mockRejectedValue(new Error('Falha ao criar carrinho'));

            await carrinhoController.criarCarrinho(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel criar carrinho' });
        }
        );
    });

    describe('obterCarrinhos', () => {
        it('deve retornar 200 quando obter carrinhos', async () => {
            const carrinhos = [{id: 1, idIngressos: [1,2], idUsuario: 1}] as Carrinho[];
            const req = {} as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'obterCarrinhos').mockResolvedValue(carrinhos);

            await carrinhoController.obterCarrinhos(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(carrinhos);
        });

        it('deve retornar 500 quando ocorrer erro ao obter carrinhos', async () => {
            const req = {} as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'obterCarrinhos').mockRejectedValue(new Error('Falha ao obter carrinhos'));

            await carrinhoController.obterCarrinhos(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel obter carrinhos' });
        });
    }

    );

    describe('obterCarrinho', () => {
        it('deve retornar 200 quando obter carrinho', async () => {
            const carrinho = {id: 1, idIngressos: [1,2], idUsuario: 1} as Carrinho;
            const req = { params: { id: 1 } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'obterCarrinho').mockResolvedValue(carrinho);

            await carrinhoController.obterCarrinho(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(carrinho);
        });

        it('deve retornar 500 quando ocorrer erro ao obter carrinho', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'obterCarrinho').mockRejectedValue(new Error('Falha ao obter carrinho'));

            await carrinhoController.obterCarrinho(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel obter carrinho' });
        });
    }

    );

    describe('atualizarCarrinho', () => {
        it('deve retornar 200 quando atualizar carrinho', async () => {
            const carrinho = {id: 1, idIngressos: [1,2], idUsuario: 1} as Carrinho;
            const req = { params: { id: 1 }, body: carrinho } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'atualizarCarrinho').mockResolvedValue(carrinho);

            await carrinhoController.atualizarCarrinho(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(carrinho);
        });

        it('deve retornar 500 quando ocorrer erro ao atualizar carrinho', async () => {
            const carrinho = {id: 1, idIngressos: [1,2], idUsuario: 1} as Carrinho;
            const req = { params: { id: 1 }, body: carrinho } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            jest.spyOn(carrinhoRepository, 'atualizarCarrinho').mockRejectedValue(new Error('Falha ao atualizar carrinho'));

            await carrinhoController.atualizarCarrinho(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel atualizar carrinho' });
        });
    }

    );

    describe('deletarCarrinho', () => {
        it('deve retornar 200 quando deletar carrinho', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;
    
            (carrinhoRepository.excluirCarrinho as jest.Mock).mockResolvedValue(true);
    
            await carrinhoController.excluirCarrinho(req, res);
    
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({ message: 'Carrinho excluido com sucesso' });
        });
    
        it('deve retornar 500 quando ocorrer erro ao deletar carrinho', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;
    
            jest.spyOn(carrinhoRepository, 'excluirCarrinho').mockRejectedValue(new Error('Falha ao deletar carrinho'));
    
            await carrinhoController.excluirCarrinho(req, res);
    
            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel excluir carrinho' });
        });
    });

});
