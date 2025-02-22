import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  private _dialogRef = inject(MatDialogRef);
  private _fb = inject(FormBuilder);
  public form = this._fb.group({
    title: ['', Validators.required],
    description: ''
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this._dialogRef.close(this.form.value);
    }
  }
}
