import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../../config/httpOptions';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterForm!: FormGroup;
  courses: any[] = [];
  showModal = false;
  selectedCourse: any = null;

 

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCourses();
  }

  private initializeForm(): void {
    this.filterForm = this.fb.group({
      name: [''],
      description: [''],
      duration: [''],
      isRequired: ['']
    });
  }

  loadCourses(name: string | null = null, isRequired = null): void {
    const institutionId = localStorage.getItem('user');
    let query = `${environment.api}/course/institution/${institutionId}`;

    const hasName = name !== null && name.trim() !== '';
    const hasIsRequired = isRequired !== null && isRequired !== '';

    if (hasName || hasIsRequired) {
      query += '?';
      const params: string[] = [];

      if (hasName) params.push(`name=${encodeURIComponent(name)}`);
      if (hasIsRequired) params.push(`isRequired=${isRequired}`);

      query += params.join('&');
    }

    this.httpClient.get(query, httpOptions)
      .subscribe((data: any) => {
        this.courses = data;
      });
  }

  onFilter(): void {
    const filters = this.filterForm.value;
    this.loadCourses(filters.name, filters.isRequired);
  }

  openCreateModal(): void {
    this.showModal = true;
    this.selectedCourse = null;
    this.filterForm.reset();
  }

  editCourse(course: any): void {
    this.selectedCourse = course;
    this.showModal = true;

    // Preenche o formulário com os dados do curso selecionado
    this.filterForm.patchValue({
      name: course.name,
      description: course.description,
      isRequired: course.isRequired
    });
  }

  saveCourse(): void {
    if (!this.filterForm.valid) {
      console.warn('🔴 Formulário inválido');
      return;
    }

    const formData = this.filterForm.value;

    if (this.selectedCourse) {
      // Edição
      const url = `${environment.api}/course/${this.selectedCourse.id}`;
      this.httpClient.put(url, formData, httpOptions).subscribe({
        next: () => {
          console.log('✏️ Curso atualizado com sucesso!');
          this.showModal = false;
          this.selectedCourse = null;
          this.loadCourses();
        },
        error: (err) => {
          
        }
      });
    } else {
      
      const institutionId = localStorage.getItem('user');
      const payload = {
        ...formData,
        institutionId
      };

      this.httpClient.post(`${environment.api}/course`, payload, httpOptions).subscribe({
        next: () => {
          console.log('🆕 Curso criado com sucesso!');
          this.showModal = false;
          this.loadCourses();
        },
        error: (err) => {
        }
      });
    }
  }

  deleteCourse(course: any): void {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o curso "${course.name}"?`);
    if (!confirmDelete) return;

    const url = `${environment.api}/course/${course.id}`;
    this.httpClient.delete(url, httpOptions).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: (err) => {
        console.error(`Erro ao excluir curso "${course.name}":`, err);
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCourse = null;
    this.filterForm.reset();
  }

  private getInstitutionIdFromToken(): string | null {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['institution_id'] || payload['sub'] || null;
    } catch (e) {
      return null;
    }
  }
}
