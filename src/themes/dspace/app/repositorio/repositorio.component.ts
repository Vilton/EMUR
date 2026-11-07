import { Component } from '@angular/core';

/**
 * "Sobre" page: Repositório da Memória Urbanística do Recife, route /about/repositorio.
 * Layout follows the mockup 5_3 SOBRE-REPOSITORIO.pdf.
 */
@Component({
  selector: 'ds-repositorio',
  standalone: true,
  imports: [],
  templateUrl: './repositorio.component.html',
  styleUrl: './repositorio.component.scss'
})
export class RepositorioComponent {

  /** What the repository contributes to; drawn as circles on the wave (desktop) or as cards (mobile). */
  readonly contributions = [
    'Tomada de decisão',
    'Instrumento de pesquisas',
    'Planejamento de longo prazo e sustentabilidade',
    'Monitoramento e avaliação de políticas públicas',
    'Integração e visão sistêmica da cidade',
    'Transparência e prestação de contas à sociedade',
    'Preservação da memória urbanística da cidade conectada ao futuro',
  ];

  /** Institutional documents. Texts as in the mockup; links still to be provided. */
  readonly documents = [
    { title: 'Decreto de Criação', text: 'Criação da Biblioteca Digital' },
    { title: 'Portaria do Repositório', text: 'Regulamenta a disponibilização de tese e dissertação' },
    { title: 'Política Institucional', text: 'Estabelece a Política Institucional de Informação' },
  ];

}
