import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environment';
import { httpOptions } from '../../../config/httpOptions';

interface StepData {
  title: string;
  content: string;
  id?: number;
  description?: string;
  stepId: number;
}

interface QuizPergunta {
  statement: string;
  activityId: number;
  options: {
    id?: number;
    text: string;
    isCorrect: boolean;
  }[];
}

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css']
})
export class StepPageComponent implements OnInit {
  filterForm!: FormGroup;
  cursos: any[] = [];
  cursoSelecionado: any = null;

  selectedStepIndex = 0;
  youtubeUrl = '';
  videoTitulo = '';
  tarefaTitulo = '';
  tarefaDescricao = '';
  tarefaSelecionadaId: number | null = null;
  tarefas: StepData[] = [];

  editMode = false;

  uploadsPorEtapa: { [index: number]: StepData[] } = {};
  stepIds: { [index: number]: number } = {};

  userSteps = [
    { label: 'Adicionar conteúdos de leitura', completed: false },
    { label: 'Adicionar vídeos', completed: false },
    { label: 'Tarefas', completed: false },
    { label: 'Criar quiz', completed: false }
  ];

  novaPergunta = {
    statement: '',
    correctIndex: 0,
    options: this.criarOpcoesVazias()
  };

  quiz: QuizPergunta[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private stepService: StepService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      isRequired: ['']
    });
    this.loadCursos();
  }

  private criarOpcoesVazias() {
    return Array(4).fill(null).map(() => ({ text: '', isCorrect: false }));
  }

  loadCursos(name: string | null = null, isRequired: string | null = null): void {
    const institutionId = localStorage.getItem('user');
    let query = `${environment.api}/course/institution/${institutionId}`;
    const params: string[] = [];
    if (name?.trim()) params.push(`name=${encodeURIComponent(name)}`);
    if (isRequired) params.push(`isRequired=${isRequired}`);
    if (params.length > 0) query += `?${params.join('&')}`;
    this.http.get<any[]>(query, httpOptions).subscribe(data => this.cursos = data);
  }

  onFilter(): void {
    const { name, isRequired } = this.filterForm.value;
    this.loadCursos(name, isRequired);
  }

  selecionarCurso(curso: any): void {
    this.cursoSelecionado = curso;
    this.selectedStepIndex = 0;
    this.uploadsPorEtapa = {};
    this.stepIds = {};
    this.tarefas = [];
    this.quiz = [];
    this.userSteps.forEach(s => s.completed = false);

    this.stepService.getStepsByCourse(curso.id).subscribe((response: any) => {
      const steps = Array.isArray(response?.steps) ? response.steps : response;
      if (!Array.isArray(steps)) {
        console.error('Erro: resposta inesperada ao buscar os steps', response);
        return;
      }
      for (const step of steps) {
        const index = step.type - 1;
        if (!this.uploadsPorEtapa[index]) this.uploadsPorEtapa[index] = [];
        const stepData: StepData = {
          title: step.title,
          content: step.content,
          id: step.activity?.id ?? undefined,
          description: step.description,
          stepId: step.id
        };
        this.uploadsPorEtapa[index].push(stepData);
        if (step.type === 3) this.tarefas.push(stepData);
        this.userSteps[index].completed = true;
        this.stepIds[index] = step.id;
      }
      this.userSteps = [...this.userSteps];
    });
  }

  get arquivosDaEtapaSelecionada(): StepData[] {
    return this.uploadsPorEtapa[this.selectedStepIndex] || [];
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onStepClick(index: number): void {
    this.selectedStepIndex = index;
  }

 removerArquivo(index: number, stepId?: number): void {
  const lista = this.uploadsPorEtapa[this.selectedStepIndex];
  if (!lista) return;

  if (stepId) {
    this.http.delete(`${environment.api}/Step/${stepId}`, httpOptions).subscribe({
      next: () => {
        lista.splice(index, 1);
        alert('Vídeo removido com sucesso!');
      },
      error: err => {
        console.error('Erro ao remover vídeo:', err);
        alert('Erro ao remover vídeo.');
      }
    });
  } else {
    lista.splice(index, 1);
  }
}



  adicionarVideoUrl(): void {
    const url = this.youtubeUrl.trim();
    const title = this.videoTitulo.trim();
    if (!url || !title) return;
    const novoVideo: StepData = { title, content: url, stepId: 0 };
    if (!this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex] = [];
    }
    this.uploadsPorEtapa[this.selectedStepIndex].push(novoVideo);
    this.createStepNaApi(novoVideo);
    this.marcarEtapaComoConcluida();
    this.youtubeUrl = '';
    this.videoTitulo = '';
  }

 criarTarefa(): void {
  const title = this.tarefaTitulo.trim();
  const description = this.tarefaDescricao.trim();

  if (!title || !description || !this.cursoSelecionado) {
    alert('Preencha título, descrição e selecione um curso corretamente.');
    return;
  }

  const stepPayload = {
    title,
    description,
    type: 'ActivityStep',
    content: '',
    courseId: this.cursoSelecionado.id
  };

  // Cria a etapa (step) primeiro
  this.stepService.createStep(this.cursoSelecionado.id, stepPayload).subscribe({
    next: (stepRes: any) => {
      const stepId = stepRes?.id;
      if (!stepId) {
        alert('Erro ao criar etapa (step).');
        return;
      }

      const activityPayload = {
        allowedAttempts: 1
      };

      // Cria a tarefa (atividade)
      this.http.post(`${environment.api}/Activity/Step/${stepId}`, activityPayload, httpOptions).subscribe({
        next: () => {
          // Requisição GET para recuperar o ID da atividade
          this.http.get(`${environment.api}/Activity/Step/${stepId}`, httpOptions).subscribe({
            next: (activityRes: any) => {
              const activityId = activityRes?.id;
              if (!activityId) {
                alert('Tarefa criada, mas não foi possível recuperar o ID.');
                return;
              }

              this.tarefaSelecionadaId = activityId;

              const tarefaCriada: StepData = {
                title,
                content: '',
                id: activityId,
                description,
                stepId
              };

              this.tarefas.push(tarefaCriada);
              if (!this.uploadsPorEtapa[2]) this.uploadsPorEtapa[2] = [];
              this.uploadsPorEtapa[2].push(tarefaCriada);
              this.stepIds[2] = stepId;

              this.marcarEtapaComoConcluida();
              this.cancelarEdicao();
            },
            error: (err) => {
              console.error('Erro ao buscar a tarefa recém-criada:', err);
              alert('Tarefa criada, mas erro ao buscar seu ID.');
            }
          });
        },
        error: (err) => {
          console.error('Erro ao criar atividade:', err);
          alert('Erro ao salvar tarefa.');
        }
      });
    },
    error: (err) => {
      console.error('Erro ao criar etapa:', err);
      alert('Erro ao criar etapa.');
    }
  });
}


  editarTarefa(tarefa: StepData): void {
    this.tarefaTitulo = tarefa.title;
    this.tarefaDescricao = tarefa.description || '';
    this.tarefaSelecionadaId = tarefa.id ?? null;
    this.editMode = true;
  }

  cancelarEdicao(): void {
    this.tarefaSelecionadaId = null;
    this.tarefaTitulo = '';
    this.tarefaDescricao = '';
    this.editMode = false;
  }

  excluirTarefa(id: number, index: number): void {
    const tarefa = this.tarefas[index];
    if (!tarefa || !tarefa.stepId) {
      alert('Erro ao encontrar o step da tarefa.');
      return;
    }
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    this.http.delete(`${environment.api}/Step/${tarefa.stepId}`, httpOptions).subscribe({
      next: () => {
        this.tarefas.splice(index, 1);
        if (this.uploadsPorEtapa[2]) {
          this.uploadsPorEtapa[2] = this.uploadsPorEtapa[2].filter(t => t.id !== id);
        }
        if (this.tarefaSelecionadaId === id) {
          this.cancelarEdicao();
        }
        alert('Tarefa excluída com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao excluir tarefa:', err);
        alert('Erro ao excluir tarefa.');
      }
    });
  }

  adicionarPergunta(): void {
    if (!this.novaPergunta.statement.trim() ||
      this.novaPergunta.options.some(opt => !opt.text.trim()) ||
      this.tarefaSelecionadaId === null) {
      alert('Preencha todos os campos da pergunta e selecione uma tarefa.');
      return;
    }
    const options = this.novaPergunta.options.map((opt, index) => ({
      text: opt.text,
      isCorrect: index === this.novaPergunta.correctIndex
    }));
    const pergunta: QuizPergunta = {
      statement: this.novaPergunta.statement,
      activityId: this.tarefaSelecionadaId,
      options
    };
    this.quiz.push(pergunta);
    this.novaPergunta = {
      statement: '',
      correctIndex: 0,
      options: this.criarOpcoesVazias()
    };
    alert('Pergunta adicionada com sucesso!');
  }

  salvarQuiz(): void {
    if (!this.quiz.length || this.tarefaSelecionadaId === null) {
      alert('Adicione perguntas e selecione uma tarefa.');
      return;
    }
    this.http.post(`${environment.api}/Activity/${this.tarefaSelecionadaId}/Question`, this.quiz, httpOptions).subscribe({
      next: () => {
        alert('Quiz salvo com sucesso!');
        this.quiz = [];
        this.tarefaSelecionadaId = null;
      },
      error: () => alert('Erro ao salvar o quiz.')
    });
  }

  atualizarEtapa(): void {
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    const stepId = this.stepIds[this.selectedStepIndex];
    if (!arquivos?.length || !stepId) return;
    const { title, content, description } = arquivos[0];
    const payload = {
      title,
      description: description ?? '',
      type: this.selectedStepIndex + 1,
      content,
      courseId: this.cursoSelecionado.id
    };
    this.stepService.updateStep(stepId, payload).subscribe(() => this.editMode = false);
  }

  private createStepNaApi(data: StepData): void {
    if (!this.cursoSelecionado) return;
    const payload = {
      title: data.title,
      description: data.description ?? '',
      type: this.selectedStepIndex + 1,
      content: data.content,
      courseId: this.cursoSelecionado.id
    };
    this.stepService.createStep(this.cursoSelecionado.id, payload).subscribe((res: any) => {
      if (res?.id) {
        this.stepIds[this.selectedStepIndex] = res.id;
        const lista = this.uploadsPorEtapa[this.selectedStepIndex];
        if (lista && lista.length) {
          lista[lista.length - 1].stepId = res.id;
        }
      }
    });
  }

  private marcarEtapaComoConcluida(): void {
    this.userSteps[this.selectedStepIndex].completed = true;
    this.userSteps = [...this.userSteps];
  }
}
