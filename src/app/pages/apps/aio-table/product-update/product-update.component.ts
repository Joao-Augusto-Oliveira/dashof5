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
  selector: 'vex-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

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
              private dialogRef: MatDialogRef<ProductUpdateComponent>,
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
      id: [ProductUpdateComponent.id++],
      nome: this.defaults.nome || '',
      pragas: this.defaults.pragas || '',
      estoque: this.defaults.estoque || '',
    });
  }

  save() {
    if (this.mode === 'update') {
      this.updateProduct();
    } 
  }
 
  updateProduct() {
    const product = this.form.value;
    product.id = this.defaults.id;
    this.dialogRef.close(product);
    this.productsService.update(product).subscribe(data => data.id);
    }

  isUpdateMode() {
    return this.mode === 'update';

    ;
  }
 

}
