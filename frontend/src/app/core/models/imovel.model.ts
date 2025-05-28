export type TipoImovel = 'apartamento' | 'casa' | 'studio' | 'comercial' | 'terreno';
export type FinalidadeImovel = 'venda' | 'aluguel';

export interface Imovel {
  id: number;
  titulo: string;
  slug: string;
  tipo: TipoImovel;
  finalidade: FinalidadeImovel;
  preco: number;
  condominio: number | null;
  iptu: number | null;
  area: number;
  quartos: number;
  banheiros: number;
  suites: number;
  vagas: number;
  andar: number | null;
  descricao: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: number | null;
  longitude: number | null;
  destaque: boolean;
  ativo: boolean;
  fotos: string[];
  fotoPrincipal: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImovelListResponse {
  total: number;
  pagina: number;
  totalPaginas: number;
  imoveis: Imovel[];
}

export interface ImovelFilters {
  tipo?: TipoImovel | '';
  finalidade?: FinalidadeImovel | '';
  precoMax?: number;
  quartos?: number;
  bairro?: string;
  destaque?: boolean;
  q?: string;
  page?: number;
  limit?: number;
}
