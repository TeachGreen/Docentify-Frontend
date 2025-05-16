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
  editMode = false;

  uploadsPorEtapa: { [index: number]: File[] } = {};
  stepIds: { [index: number]: number } = {};

  userSteps = [
    { label: 'Adicionar conteúdos de leitura', completed: false },
    { label: 'Adicionar vídeos', completed: false },
    { label: 'Adicionar tarefas', completed: false },
    { label: 'Quiz de avaliação final', completed: false }
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

        if (step.content.includes('youtube.com') || step.content.includes('youtu.be')) {
          const fakeFile = new File([step.content], step.content, { type: 'text/url' });
          this.uploadsPorEtapa[index].push(fakeFile);
        } else {
          const fakeFile = new File([], `Conteúdo etapa ${index + 1}`, { type: 'application/pdf' });
          this.uploadsPorEtapa[index].push(fakeFile);
        }

        this.userSteps[index].completed = true;
        this.stepIds[index] = step.id;
      }

      this.userSteps = [...this.userSteps]; // força detecção
    });
  }

  get arquivosDaEtapaSelecionada(): File[] {
    return this.uploadsPorEtapa[this.selectedStepIndex] || [];
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onStepClick(index: number): void {
    this.selectedStepIndex = index;
  }

  async onFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    if (!this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex] = [];
    }

    for (const file of Array.from(files)) {
      this.uploadsPorEtapa[this.selectedStepIndex].push(file);
      const base64 = await this.convertFileToBase64(file);
      this.createStepNaApi(base64);
    }

    this.marcarEtapaComoConcluida();
    input.value = '';
  }

  adicionarVideoUrl(): void {
    const url = this.youtubeUrl.trim();
    if (!url) return;

    const fakeFile = new File([url], url, { type: 'text/url' });

    if (!this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex] = [];
    }

    this.uploadsPorEtapa[this.selectedStepIndex].push(fakeFile);
    this.createStepNaApi(url);

    this.marcarEtapaComoConcluida();
    this.youtubeUrl = '';
  }

  removerArquivo(index: number): void {
    if (this.uploadsPorEtapa[this.selectedStepIndex]) {
      this.uploadsPorEtapa[this.selectedStepIndex].splice(index, 1);
    }
  }

  async atualizarEtapa(): Promise<void> {
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    const stepId = this.stepIds[this.selectedStepIndex];
    if (!arquivos || arquivos.length === 0 || !stepId) return;

    const content = arquivos[0].type === 'text/url'
      ? await arquivos[0].text()
      : await this.convertFileToBase64(arquivos[0]);

    const payload = {
      title: this.userSteps[this.selectedStepIndex].label,
      description: '',
      type: this.selectedStepIndex + 1,
      content,
      courseId: this.cursoSelecionado.id
    };

    this.stepService.updateStep(stepId, payload).subscribe();
    this.editMode = false;
  }

  private createStepNaApi(content: string): void {
    if (!this.cursoSelecionado) return;

    const payload = {
      title: this.userSteps[this.selectedStepIndex].label,
      description: '',
      type: this.selectedStepIndex + 1,
      content,
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
    this.userSteps = [...this.userSteps]; // força atualização visual
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = err => reject(err);
    });
  }
}
