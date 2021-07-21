 
  export class Produto {
    id: string
    nome: string
    estoque: string
    pragas?: any
  

  constructor(product) {
    this.id = product.id;
    this.nome = product.nome;
    this.estoque = product.estoque;
    this.pragas = product.pragas;   
  }

}