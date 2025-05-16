import { Component, OnInit } from '@angular/core';
import { StepService } from '../../../services/step.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environment';
import { httpOptions } from '../../../config/httpOptions';

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
  editMode = false;

  uploadsPorEtapa: { [index: number]: { title: string; content: string }[] } = {};
  stepIds: { [index: number]: number } = {};

  userSteps = [
    { label: 'Adicionar conteúdos de leitura', completed: false },
    { label: 'Adicionar vídeos', completed: false },
    { label: 'Tarefas', completed: false }
  ];

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
    this.userSteps.forEach(s => s.completed = false);

    this.stepService.getStepsByCourse(curso.id).subscribe((steps: any[]) => {
      for (const step of steps) {
        const index = step.type - 1;
        if (!this.uploadsPorEtapa[index]) this.uploadsPorEtapa[index] = [];

        this.uploadsPorEtapa[index].push({ title: step.title, content: step.content });
        this.userSteps[index].completed = true;
        this.stepIds[index] = step.id;
      }

      this.userSteps = [...this.userSteps]; // força detecção
    });
  }

  get arquivosDaEtapaSelecionada(): { title: string; content: string }[] {
    return this.uploadsPorEtapa[this.selectedStepIndex] || [];
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onStepClick(index: number): void {
    this.selectedStepIndex = index;
  }

  adicionarVideoUrl(): void {
    const url = this.youtubeUrl.trim();
    const title = this.videoTitulo.trim();

    if (!url || !title) return;

    const video = { title, content: url };

    if (!this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex] = [];
    }

    this.uploadsPorEtapa[this.selectedStepIndex].push(video);
    this.createStepNaApi(video);

    this.marcarEtapaComoConcluida();
    this.youtubeUrl = '';
    this.videoTitulo = '';
  }

  removerArquivo(index: number): void {
    if (this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex].splice(index, 1);
    }
  }

  atualizarEtapa(): void {
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    const stepId = this.stepIds[this.selectedStepIndex];
    if (!arquivos || arquivos.length === 0 || !stepId) return;

    const payload = {
      title: arquivos[0].title,
      description: '',
      type: this.selectedStepIndex + 1,
      content: arquivos[0].content,
      courseId: this.cursoSelecionado.id
    };

    this.stepService.updateStep(stepId, payload).subscribe();
    this.editMode = false;
  }

  private createStepNaApi(video: { title: string; content: string }): void {
    if (!this.cursoSelecionado) return;

    const payload = {
      title: video.title,
      description: '',
      type: this.selectedStepIndex + 1,
      content: video.content,
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
