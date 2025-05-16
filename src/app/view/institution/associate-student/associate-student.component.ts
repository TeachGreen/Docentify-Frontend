import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environment';
import { httpOptions } from '../../../config/httpOptions';

@Component({
  selector: 'app-associate-student',
  templateUrl: './associate-student.component.html',
  styleUrls: ['./associate-student.component.css']
})
export class AssociateStudentComponent {
  form!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      document: ['', [Validators.required]]
    });
  }

  associate(): void {
    if (this.form.invalid) return;

    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    const document = this.form.value.document;

    this.http.post(`${environment.api}/Institution/AssociateByDocument/${document}`, {}, httpOptions)
      .subscribe({
        next: () => {
          this.successMessage = '✅ Aluno associado com sucesso!';
          this.loading = false;
          this.form.reset();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || '❌ Erro ao associar aluno.';
          this.loading = false;
        }
      });
  }
}
