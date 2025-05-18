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
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
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

  loadCursos(name: string | null = null, isRequired: string | null = null): void {
    const institutionId = localStorage.getItem('user');
    let query = `${environment.api}/course/institution/${institutionId}`;
    const params: string[] = [];

    if (name?.trim()) params.push(`name=${encodeURIComponent(name)}`);
    if (isRequired) params.push(`isRequired=${isRequired}`);

    if (params.length > 0) {
      query += `?${params.join('&')}`;
    }

    this.http.get<any[]>(query, httpOptions).subscribe(data => {
      this.cursos = data;
    });
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

    this.stepService.getStepsByCourse(curso.id).subscribe((steps: any[]) => {
      for (const step of steps) {
        const index = step.type - 1;
        if (!this.uploadsPorEtapa[index]) this.uploadsPorEtapa[index] = [];

        const stepData: StepData = {
          title: step.title,
          content: step.content,
          id: step.id,
          description: step.description
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

  removerArquivo(index: number): void {
    if (this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex].splice(index, 1);
    }
  }

  adicionarVideoUrl(): void {
    const url = this.youtubeUrl.trim();
    const title = this.videoTitulo.trim();
    if (!url || !title) return;

    const novoVideo: StepData = { title, content: url };
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
    alert('Preencha título e descrição da tarefa.');
    return;
  }

  const stepPayload = {
    title,
    description,
    type: 3,
    content: '',
    courseId: this.cursoSelecionado.id
  };

  this.stepService.createStep(this.cursoSelecionado.id, stepPayload).subscribe({
    next: (stepRes: any) => {
      const stepId = stepRes?.id;
      if (!stepId) {
        alert('Erro ao criar step.');
        return;
      }

      const activityPayload = {
        name: title,
        description,
        isRequired: true,
        maxGrade: 10
      };

      this.http.post(`${environment.api}/Activity/Step/${stepId}`, activityPayload, httpOptions).subscribe({
        next: (activityRes: any) => {
          const tarefaCriada: StepData = {
            title,
            content: '',
            id: activityRes?.id,
            description
          };

          this.tarefas.push(tarefaCriada);
          if (!this.uploadsPorEtapa[2]) this.uploadsPorEtapa[2] = [];
          this.uploadsPorEtapa[2].push(tarefaCriada);
          this.stepIds[2] = stepId;

          this.marcarEtapaComoConcluida();
          this.tarefaTitulo = '';
          this.tarefaDescricao = '';
        },
        error: (err) => {
          console.error('Erro ao criar atividade:', err);
          alert('Erro ao salvar tarefa. Verifique os dados e tente novamente.');
        }
      });
    },
    error: (err) => {
      console.error('Erro ao criar step:', err);
      alert('Erro ao criar etapa da tarefa.');
    }
  });
}


  adicionarPergunta(): void {
    if (
      !this.novaPergunta.statement.trim() ||
      this.novaPergunta.options.some(opt => !opt.text.trim()) ||
      this.tarefaSelecionadaId === null
    ) {
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
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
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
      error: () => {
        alert('Erro ao salvar o quiz.');
      }
    });
  }

  atualizarEtapa(): void {
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    const stepId = this.stepIds[this.selectedStepIndex];
    if (!arquivos || arquivos.length === 0 || !stepId) return;

    const { title, content, description } = arquivos[0];

    const payload = {
      title,
      description: description ?? '',
      type: this.selectedStepIndex + 1,
      content,
      courseId: this.cursoSelecionado.id
    };

    this.stepService.updateStep(stepId, payload).subscribe(() => {
      this.editMode = false;
    });
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
      }
    });
  }

  private marcarEtapaComoConcluida(): void {
    this.userSteps[this.selectedStepIndex].completed = true;
    this.userSteps = [...this.userSteps];
  }
}
