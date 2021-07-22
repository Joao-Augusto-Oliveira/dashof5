import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { Produto } from '../interfaces/products.models';
import { ProductsApiService } from 'src/app/services/products-api.service';

@Component({
  selector: 'vex-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  product: Produto;

  nome: string = "";
  pragas: string = "";
  estoque: string = "";

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerCreateComponent>,
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
      id: [CustomerCreateComponent.id++],
      nome: this.defaults.nome || '',
      pragas: this.defaults.pragas || '',
      estoque: this.defaults.estoque || '',
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const valorEmitir = {nome: this.nome, estoque: this.estoque, pragas: this.pragas}
    this.productsService.createProduct(valorEmitir).subscribe(resultado => {
      console.log(resultado);      

      this.dialogRef.close();
      location.reload();

    })


  }

  

  updateCustomer() {

    console.log('update')
    // const customer = this.form.value;
    // customer.id = this.defaults.id;

    // this.dialogRef.close(customer);

    // this.productsService.updateProduct(customer.id).subscribe(() => {
    //   console.log('update')
    // })


  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';

    ;
  }
 

}