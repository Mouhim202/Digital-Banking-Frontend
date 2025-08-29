import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgIf, NgForOf, AsyncPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../services/customer';
import { Customer } from '../model/customer.model';
import {catchError, Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgIf, NgForOf, HttpClientModule, AsyncPipe],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']

})
export class Customers implements OnInit {
  customers!: Observable<Customer[]>;
  errorMessage! : string;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

}
