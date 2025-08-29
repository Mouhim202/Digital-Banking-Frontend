import {Component, NgProbeToken, OnInit, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgIf, NgForOf, AsyncPipe, JsonPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../services/customer';
import { Customer } from '../model/customer.model';
import {catchError, map, Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as sea from 'node:sea';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgIf, NgForOf, HttpClientModule, AsyncPipe, ReactiveFormsModule, JsonPipe],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']

})
export class Customers implements OnInit {
  customers!: Observable<Customer[]>;
  errorMessage! : string;
  searchFormGroup! : FormGroup ;

  constructor(private customerService: CustomerService, private fb :FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
        keyword : this.fb.control("")
    });
   this.handleSearchCustomers();
  }
  handleSearchCustomers(){
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteCustomer(c: Customer) {
    let conf= confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp:Object)=>{
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        )
      },
      error :err =>{
        console.log(err);
      }
    })

  }
}
