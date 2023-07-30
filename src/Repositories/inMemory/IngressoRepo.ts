import { Ingresso } from "src/Models/Ingresso";
import { Evento } from "src/Models/Eventos";
import { IngressoRepository } from "../IngressoRepository";

export class IngressoRepo implements IngressoRepository{
    private ingressos: Ingresso[] = [];

    async criarIngresso(ingresso: Ingresso): Promise<Ingresso> {     
        this.ingressos.push(ingresso);
        return ingresso;
    }

    async obterIngressos(): Promise<Ingresso[]> {
        return this.ingressos;
    }

    async obterIngresso(id: number): Promise<Ingresso | null> {
        const ingresso = this.ingressos.find(ingresso => ingresso.id === id);
        return ingresso || null;
    }

    async atualizarIngresso(ingresso: Ingresso): Promise<Ingresso | null> {
        const index = this.ingressos.findIndex(e => e.id === ingresso.id);
        if (index === -1) {
          return null; // Retornar null quando o ingresso não existe
        }
        this.ingressos[index] = ingresso;
        return ingresso;
      }
      

    async excluirIngresso(id: number): Promise<boolean> {
        const index = this.ingressos.findIndex(ingresso => ingresso.id === id);
        if (index === -1) {
            return false;
        } 
        this.ingressos.splice(index, 1);
        return true;
    }

    async obterIngressosPorEvento(evento: Evento): Promise<Ingresso[]> {
        return this.ingressos.filter(ingresso => ingresso.evento.id === evento.id);
    }

}


