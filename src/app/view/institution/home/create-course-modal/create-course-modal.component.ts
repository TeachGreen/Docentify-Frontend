import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-create-course-modal',
  templateUrl: './create-course-modal.component.html',
})
export class CreateCourseModalComponent implements OnChanges {
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();
  @Input() course: any;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      isRequired: [''], // ✅ adicionado corretamente
      duration: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && this.course) {
      this.form.patchValue({
        name: this.course.name,
        description: this.course.description,
        isRequired: String(this.course.isRequired),
        duration: this.course.duration
      });
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const formValue = this.form.value;

    const courseData = {
      name: formValue.name,
      description: formValue.description,
      isRequired: formValue.isRequired === 'true',
      duration: formValue.duration
    };

    if (this.course) {
      // PATCH (edição)
      this.courseService.updateCourse(this.course.id, courseData).subscribe({
        next: () => {
          this.created.emit();
          this.close();
        },
        error: (err) => {
          console.error('❌ Erro ao editar curso:', err);
        }
      });
    } else {
      // POST (criação)
      this.courseService.createCourse(courseData).subscribe({
        next: () => {
          this.created.emit();
          this.close();
        },
        error: (err) => {
          console.error('❌ Erro ao criar curso:', err);
        }
      });
    }
  }

  close(): void {
    this.closed.emit();
  }
}
