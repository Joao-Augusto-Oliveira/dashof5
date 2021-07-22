import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import icPerson from '@iconify/icons-ic/twotone-person';
import { Produto } from '../interfaces/products.models';
import { ProductsApiService } from 'src/app/services/products-api.service';
import baselineBugReport from '@iconify-icons/ic/baseline-bug-report';
import baselineInsertChart from '@iconify-icons/ic/baseline-insert-chart';

@Component({
  selector: 'vex-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  product: Produto;

  nome: string;
  pragas: string;
  estoque: string;

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  icClose = icClose;
  icPerson = icPerson;
  baselineBugReport = baselineBugReport;
  baselineInsertChart = baselineInsertChart;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
              private fb: FormBuilder,
              private productsService: ProductsApiService              
              ) {
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Produto;
    }

    this.form = this.fb.group({
      id: [CustomerCreateUpdateComponent.id++],
      nome: this.defaults.nome || '',
      pragas: this.defaults.pragas || '',
      estoque: this.defaults.estoque || '',
    });
  }

  save() {
    if (this.mode === 'update') {
      this.updateCustomer();
    } 
  }
 
  updateCustomer() {
    const customer = this.form.value;
    customer.id = this.defaults.id;
    this.dialogRef.close(customer);
    this.productsService.update(customer).subscribe(data => data.id);
    }

  isUpdateMode() {
    return this.mode === 'update';

    ;
  }
 

}
