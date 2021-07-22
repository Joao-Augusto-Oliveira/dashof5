import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { ProductsApiService } from 'src/app/services/products-api.service';
import { Produto } from './interfaces/products.models';
import { ProductCreateComponent } from './product-create/product-create.component';


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
export class AioTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  formMudou: boolean = false;

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Produto[]> = new ReplaySubject<Produto[]>(1);
  data$: Observable<Produto[]> = this.subject$.asObservable();
  products: Produto[];


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
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

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
      
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createProduct() {
    this.dialog.open(ProductCreateComponent).afterClosed().subscribe((product: Produto) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (product) {
        
        this.products.unshift(new Produto(product));
        this.subject$.next(this.products);
        this.formMudou = true;
      }
    });
  }

  updateCustomer(product: Produto) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: product
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        this.productsService.updateProduct(product).subscribe(()=> {
          this.listar()
        })
        
        // const index = this.products.findIndex((existingCustomer) => existingCustomer.id === updatedCustomer.id);
        // this.products[index] = new Produto(updatedCustomer);
        // this.subject$.next(this.products);
        this.formMudou = true;
      }
    });
  }

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Produto) {
    const index = this.products.findIndex(c => c === row);
    // this.products[index].labels = change.value;
    this.subject$.next(this.products);
  }

  podeMudarRota(){
    if (this.formMudou) {
      confirm('Tem certeza que deseja sair dessa página?')
    }
    return true;
  }

}
