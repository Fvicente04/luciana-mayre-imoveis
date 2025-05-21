import { Imovel } from '../models/Imovel';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function gerarSlugUnico(titulo: string, idExcluir?: number): Promise<string> {
  const base = slugify(titulo);
  let candidato = base;
  let sufixo = 1;

  while (true) {
    const existing = await Imovel.findOne({
      where: { slug: candidato },
      paranoid: false
    });

    if (!existing || existing.id === idExcluir) {
      return candidato;
    }

    // slug gerado no frontend por praticidade — em caso de colisão o backend adiciona sufixo numérico
    candidato = `${base}-${sufixo}`;
    sufixo++;
  }
}
