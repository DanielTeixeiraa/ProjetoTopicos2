import { Evento } from "./Eventos";

export interface Ingresso {
    id: number;
    evento: Evento;
    preco: number;
}