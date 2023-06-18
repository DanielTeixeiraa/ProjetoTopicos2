# Sistema de Compra de Ingressos

O sistema de Compra de Ingressos é uma aplicação para gerenciar a venda e compra de ingressos para eventos.

## Entidades

### Ingresso

A entidade "Ingresso" representa um ingresso individual.

Atributos:

- `tipo` (string): O tipo de ingresso.
- `preco` (number): O preço do ingresso.
- `dataHora` (Date): A data e hora do evento.
- `localizacao` (string): A localização do evento.
- `disponibilidade` (number): A quantidade disponível de ingressos.

### Usuario

A entidade "Usuario" representa um usuário do sistema.

Atributos:

- `nome` (string): O nome do usuário.
- `email` (string): O email do usuário.
- `senha` (string): A senha do usuário.

### Evento

A entidade "Evento" representa um evento para o qual os ingressos são vendidos.

Atributos:

- `nome` (string): O nome do evento.
- `dataHora` (Date): A data e hora do evento.
- `localizacao` (string): A localização do evento.
- `capacidade` (number): A capacidade máxima de público para o evento.

### Carrinho

A entidade "Carrinho" representa o carrinho de compras do usuário.

Atributos:

- `ingressos` (array de Ingresso): Os ingressos adicionados ao carrinho.

### Compra

A entidade "Compra" representa uma compra concluída de ingressos.

Atributos:

- `usuario` (Usuario): O usuário que efetuou a compra.
- `ingressos` (array de Ingresso): Os ingressos adquiridos.
- `valorTotal` (number): O valor total da compra.
- `dataHora` (Date): A data e hora da compra.