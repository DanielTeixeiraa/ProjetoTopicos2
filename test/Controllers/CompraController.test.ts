import { Compra } from "../../src/Models/Compra";
import { CompraController } from '../../src/Controllers/CompraController';
import { CompraRepository } from "../../src/Repositories/CompraRepository";
import { Request, Response } from 'express';

describe('CompraController', () => {
    let compraController: CompraController;
    let compraRepository: CompraRepository;

    beforeEach(() => {
        const compraRepositoryMock = {
            criarCompra: jest.fn(),
            obterCompras: jest.fn(),
            obterCompra: jest.fn(),
            atualizarCompra: jest.fn(),
            excluirCompra: jest.fn(),
        };

        compraRepository = compraRepositoryMock;
        compraController = new CompraController(compraRepository);
    });

    describe('criarCompra', () => {
        it('deve retornar 201 quando criar compra', async () => {
            const compra = { id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() } as Compra;
            const req = { body: compra } as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'criarCompra').mockResolvedValue(compra)

            await compraController.criarCompra(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith(compra);
        });

        it('deve retornar 500 quando ocorrer erro ao criar compra', async () => {
            const compra = { id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() } as Compra;
            const req = { body: compra } as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            jest.spyOn(compraRepository, 'criarCompra').mockRejectedValue(new Error('Falha ao criar compra'));

            await compraController.criarCompra(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel criar compra' });
        });
    });


    describe('obterCompras', () => {
        it('deve retornar 200 quando obter compras', async () => {
            const compras = [{ id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() }] as Compra[];
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'obterCompras').mockResolvedValue(compras);

            await compraController.obterCompras(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(compras);
        });

        it('deve retornar 500 quando ocorrer erro ao obter compras', async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'obterCompras').mockRejectedValue(new Error('Falha ao obter compras'));

            await compraController.obterCompras(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel obter compras' });
        });
    });

    describe('obterCompra', () => {
        it('deve retornar 200 quando obter compra', async () => {
            const compra = { id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() } as Compra;
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'obterCompra').mockResolvedValue(compra);

            await compraController.obterCompra(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(compra);
        });

        it('deve retornar 500 quando ocorrer erro ao obter compra', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'obterCompra').mockRejectedValue(new Error('Falha ao obter compra'));

            await compraController.obterCompra(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel obter compra' });
        });
    });

    describe('atualizarCompra', () => {
        it('deve retornar 200 quando atualizar compra', async () => {
            const compra = { id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() } as Compra;
            const req = { params: { id: 1 }, body: compra } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'atualizarCompra').mockResolvedValue(compra);

            await compraController.atualizarCompra(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith(compra);
        });

        it('deve retornar 500 quando ocorrer erro ao atualizar compra', async () => {
            const compra = { id: 1, idIngressos: [1,2], idUsuario: 1, dataCompra: new Date() } as Compra;
            const req = { params: { id: 1 }, body: compra } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            jest.spyOn(compraRepository, 'atualizarCompra').mockRejectedValue(new Error('Falha ao atualizar compra'));

            await compraController.atualizarCompra(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel atualizar compra' });
        });
    });

    describe('excluirCompra', () => {
        it('deve retornar 200 quando excluir compra', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            (compraRepository.excluirCompra as jest.Mock).mockResolvedValue(true);

            await compraController.excluirCompra(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({ message: 'Compra excluida com sucesso' });
        });

        it('deve retornar 500 quando ocorrer erro ao excluir compra', async () => {
            const req = { params: { id: 1 } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            (compraRepository.excluirCompra as jest.Mock).mockRejectedValue(new Error()); // Correção

            await compraController.excluirCompra(req, res);

            expect(res.status).toBeCalledWith(500);
            expect(res.json).toBeCalledWith({ error: 'Nao foi possivel excluir compra' });
        });
    });
});


