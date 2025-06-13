import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { Button, ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    CardModule,
    InputTextModule,
    InputNumberModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})

export class BookFormComponent {

  bookForm: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private inputTextModule: InputTextModule,
    private inputNumberModule: InputNumberModule

  ) {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: ['1', [Validators.required, Validators.min(1)]],
      price: ['0', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getBookById(+id!);

    };
  }

  getBookById(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (foundBook) => {
        this.bookForm.patchValue(foundBook);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/');
      }
    });
  }

  createBook() {
    if (this.bookForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'revise los campos e intente nuevamente'
      });
      return;
    }
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro guardado correctamente'
        });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el libro'
        });
      }


    });

  }
  updateBook() {
    if (this.bookForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'revise los campos e intente nuevamente'
      });
      return;
    }
    this.bookService.updateBook(this.bookForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro actualizado correctamente'
        });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el libro'
        });
      }


    });

  }

}



