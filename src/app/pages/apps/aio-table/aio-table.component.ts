import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableLabels } from '../../../../static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { Produto } from './interfaces/products.models';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { FormCanDeactivate } from 'src/app/guards/form-candeactivate';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class AioTableComponent implements OnInit, AfterViewInit, FormCanDeactivate {

  layoutCtrl = new FormControl('boxed');

  formMudou: boolean = false; 

  products: Produto[];

  filter: string = '';

  @Input()
  columns: TableColumn<Produto>[] = [
    { label: 'Nome', property: 'nome', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'ID', property: 'id', type: 'text', visible: true },
    { label: 'PRAGAS', property: 'pragas', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'QTD/PORÇÃO', property: 'estoque', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Produto> | null;
  selection = new SelectionModel<Produto>(true, []);

  labels = aioTableLabels;

  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsApiService,
    
    ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  listar(){
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
    }) 
  }
  
  ngOnInit() {
    this.listar();  
    
    this.productsService.getAllProducts().subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });        
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value
  }

  ngAfterViewInit() {
    console.log('teste')
  }

  createProduct() {
    this.dialog.open(ProductCreateComponent).afterClosed().subscribe((product: Produto) => {
      this.formMudou = true;
      this.listar();
    });
  }

  updateProduct(product: Produto) {
    this.dialog.open(ProductUpdateComponent, {
      data: product
    }).afterClosed().subscribe(() => {
      this.listar();
      this.formMudou = true;
      })      
    };
  

  deleteProduct(product: Produto) {
    this.productsService.removeProduct(product).subscribe(() => {
      this.listar()
    })} 
   
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  podeMudarRota(){
    if (this.formMudou) {
      this.openDialog()
    }
    return true;
  }

  podeDesativar(){
    return this.podeMudarRota();
  }

  openDialog() {
    this.dialog.open(ConfirmModalComponent).afterClosed().subscribe(()=> {
      console.log('teste')
    })
    };

}
