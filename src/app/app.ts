import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Navbar} from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit{
  ngOnInit(): void {

  }
}
