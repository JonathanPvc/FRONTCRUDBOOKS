import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  books: Book[] = [];


  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {

    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
}







