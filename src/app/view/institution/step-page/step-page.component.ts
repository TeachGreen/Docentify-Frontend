import { Component } from '@angular/core';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.css']
})
export class StepPageComponent {
  selectedStepIndex = 0;
  youtubeUrl = '';
  editMode = false;

  uploadsPorEtapa: { [index: number]: File[] } = {};
  stepIds: { [index: number]: number } = {}; // Mapeia etapas a IDs criados pela API

  userSteps = [
    { label: 'Adicionar conteúdos de leitura', completed: false },
    { label: 'Adicionar vídeos', completed: false },
    { label: 'Adicionar atividades', completed: false },
    { label: 'Quiz de avaliação final', completed: false },
    { label: 'Adicionar certificado', completed: false }
  ];

  constructor(private stepService: StepService) {}

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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    if (arquivos && arquivos[index]) {
      arquivos.splice(index, 1);
    }
  }

  async atualizarEtapa(): Promise<void> {
    const arquivos = this.uploadsPorEtapa[this.selectedStepIndex];
    const stepId = this.stepIds[this.selectedStepIndex];

    if (!arquivos || arquivos.length === 0 || !stepId) return;

    const isYoutubeUrl = arquivos[0].type === 'text/url';
    const content = isYoutubeUrl
      ? await arquivos[0].text()
      : await this.convertFileToBase64(arquivos[0]);

    const payload = {
      title: this.userSteps[this.selectedStepIndex].label,
      description: '',
      type: this.selectedStepIndex + 1,
      content,
      courseId: 1 // Substituir por valor dinâmico futuramente
    };

    this.stepService.updateStep(stepId, payload).subscribe();
    this.editMode = false;
  }

  private createStepNaApi(content: string): void {
    const courseId = 1;
    const payload = {
      title: this.userSteps[this.selectedStepIndex].label,
      description: '',
      type: this.selectedStepIndex + 1,
      content,
      courseId
    };

    this.stepService.createStep(courseId, payload).subscribe((res: any) => {
      if (res?.id) {
        this.stepIds[this.selectedStepIndex] = res.id;
      }
    });
  }

  private marcarEtapaComoConcluida(): void {
    this.userSteps[this.selectedStepIndex].completed = true;
    this.userSteps = [...this.userSteps]; // força detecção de mudança
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
