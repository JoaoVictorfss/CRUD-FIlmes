//modelo de filme => atributos dessa interface => como vai mandar para o backend
export interface Filme {
  id?: number;
  titulo: string;
  urlFoto?: string;
  dtLancamento: Date;
  descricao?: string;
  nota: number;
  urlIMDb?: string;
  genero: string;
}
