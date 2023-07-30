import { Request, Response } from "express";
import { Usuario } from "src/Models/Usuario";
import { UsuarioRepository } from "src/Repositories/UsuarioRepository";

export class UsuarioController {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async criarUsuario(req: Request, res: Response) {
        try {
        const usuario = req.body as Usuario;
        const novoUsuario = await this.usuarioRepository.criarUsuario(usuario);
        res.status(201).json(novoUsuario);
        } catch (error) {
        res.status(500).json({error: 'Nao foi possivel criar usuario' })
        }
    }

    async obterUsuarios(req: Request, res: Response) {
        try {
        const usuarios = await this.usuarioRepository.obterUsuarios();
        res.json(usuarios);
        res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({error: 'Nao foi possivel obter usuarios' })
        }        
    }

    async obterUsuario(req: Request, res: Response) {
        const id = parseInt(req.params.id);     
        try {
            const usuario = await this.usuarioRepository.obterUsuario(id);
    
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ error: 'Usuario nao encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel obter usuario' });
        }
    }
      

    async atualizarUsuario(req: Request, res: Response) {
        try {
          const usuario = req.body as Usuario;
          const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(usuario);
          
          if (usuarioAtualizado === null) { // Verifica se o usuario foi encontrado
            res.status(404).json({ error: 'Usuario nao encontrado' });
          } else {
            res.status(200).json(usuarioAtualizado);
          }
        } catch (error) {
          res.status(500).json({ error: 'Nao foi possivel atualizar usuario' });
        }
      }
      

    async excluirUsuario(req: Request, res: Response) {
        try {
          const id = parseInt(req.params.id);
          const usuarioExcluido = await this.usuarioRepository.excluirUsuario(id);
          
          if (usuarioExcluido) { // Verifica se o usuario foi encontrado
            res.status(200).json({ message: 'Usuario excluido com sucesso' });
          } else {
            res.status(404).json({ error: 'Usuario nao encontrado' });
          }
        } catch (error) {
            res.status(500).json({ error: 'Nao foi possivel excluir usuario' });
            }
        }

    }


