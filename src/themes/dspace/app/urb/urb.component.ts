import { Component } from '@angular/core';

interface UrbPerson {
  name: string;
  /** Parts of the role, each starting on a new line (long parts wrap to the width). */
  role: string[];
  /** File name in assets/dspace/images/emur/sobre/urb/equipe (without .webp). */
  photo: string;
}

const PHOTOS = 'assets/dspace/images/emur/sobre/urb/equipe/';

/**
 * "Sobre" page: Autarquia de Urbanização do Recife (URB-Recife), route /about/urb.
 * Layout follows the mockup 5.1 SOBRE-URB.pdf.
 */
@Component({
  selector: 'ds-urb',
  standalone: true,
  imports: [],
  templateUrl: './urb.component.html',
  styleUrl: './urb.component.scss'
})
export class UrbComponent {

  readonly photos = PHOTOS;

  /** Colors of the dots on the map, one per year of the works. */
  readonly timeline = [
    { year: 2015, color: '#00ff24' },
    { year: 2016, color: '#fa0600' },
    { year: 2017, color: '#073bff' },
    { year: 2018, color: '#00f4ff' },
    { year: 2019, color: '#ff68b5' },
    { year: 2020, color: '#ff7c00' },
    { year: 2021, color: '#8de8ca' },
    { year: 2022, color: '#aacc58' },
    { year: 2023, color: '#ab00ff' },
    { year: 2024, color: '#ff0099' },
  ];

  readonly leaders: UrbPerson[] = [
    { name: 'Victor Marques', role: ['Prefeito do Recife'], photo: 'victor-marques' },
    { name: 'Beatriz Menezes', role: ['Secretária de Infraestrutura'], photo: 'beatriz-menezes' },
    { name: 'Luís Henrique Lira', role: ['Presidente da URB-Recife'], photo: 'luis-henrique-lira' },
  ];

  /** Row by row, three per row (same order as the mockup columns read across). */
  readonly urbTeam: UrbPerson[] = [
    {
      name: 'Luciana Azevedo',
      role: ['Arquiteta Urbanista', 'Criação e Coordenadora Geral da Estação da Memória Urbanística do Recife'],
      photo: 'luciana-azevedo',
    },
    { name: 'Fátima Cisneiros', role: ['Arquiteta Urbanista', 'Coordenadora de Gestão'], photo: 'fatima-cisneiros' },
    { name: 'Marcelo Figueiredo', role: ['Arquiteto Urbanista'], photo: 'marcelo-figueiredo' },
    // Role still to be defined (placeholder in the mockup).
    { name: 'Ângela Ayres', role: [], photo: 'angela-ayres' },
    { name: 'Sennor Ramos', role: ['Assessoria Especial do Prefeito'], photo: 'sennor-ramos' },
    { name: 'Elvira Fernandes', role: ['Advogada', 'Assessoria Jurídica'], photo: 'elvira-fernandes' },
    { name: 'Gleyce Medeiros', role: ['Analista Social'], photo: 'gleyce-medeiros' },
    { name: 'Socorro Albuquerque', role: ['Assistente Social'], photo: 'socorro-albuquerque' },
    { name: 'Lucenilda Lopes', role: ['Bibliotecária'], photo: 'lucenilda-lopes' },
  ];

  readonly ufpeTeam: UrbPerson[] = [
    { name: 'Vildeane Borba', role: ['Coordenadora Geral do Repositório'], photo: 'vildeane-borba' },
    { name: 'Vânia Ferreira', role: ['Supervisora técnica do Repositório'], photo: 'vania-ferreira' },
    {
      name: 'Micael Matheus',
      role: ['Arquiteto Urbanista', 'Assessor técnico de atividades da EMUR'],
      photo: 'micael-matheus',
    },
    {
      name: 'Mariana Amorim',
      role: ['Arquiteta Urbanista', 'Assessora técnica de atividades da EMUR'],
      photo: 'mariana-amorim',
    },
    { name: 'Camila Farias', role: ['Apoio técnico de T.I.'], photo: 'camila-farias' },
  ];

}
