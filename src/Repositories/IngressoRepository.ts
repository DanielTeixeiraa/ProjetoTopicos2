import { Ingresso } from "src/Models/Ingresso";
import { Evento } from "src/Models/Eventos";

export interface IngressoRepository {
    criarIngresso(ingresso: Ingresso): Promise<Ingresso>;
    obterIngressos(): Promise<Ingresso[]>;
    obterIngresso(id: number): Promise<Ingresso | null>;
    atualizarIngresso(ingresso: Ingresso): Promise<Ingresso | null >;
    excluirIngresso(id: number): Promise<boolean>;
    obterIngressosPorEvento(evento: Evento): Promise<Ingresso[]>;
}
