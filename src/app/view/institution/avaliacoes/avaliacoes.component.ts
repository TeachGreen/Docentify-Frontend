import { Component, OnInit } from '@angular/core';

interface ResultadoAvaliacao {
  nomeAluno: string;
  nota: number;
  data: Date;
}

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AvaliacoesComponent implements OnInit {
  resultados: ResultadoAvaliacao[] = [];

  constructor() {}

  ngOnInit(): void {
    // Substituir por chamada real à API
    this.resultados = [
      { nomeAluno: 'João da Silva', nota: 8.5, data: new Date('2025-05-10') },
      { nomeAluno: 'Maria Oliveira', nota: 9.2, data: new Date('2025-05-11') },
      { nomeAluno: 'Carlos Souza', nota: 7.4, data: new Date('2025-05-12') },
    ];
  }
}
