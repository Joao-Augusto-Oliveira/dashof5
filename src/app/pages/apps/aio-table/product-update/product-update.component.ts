import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Produto } from "../interfaces/products.models";
import { ProductsApiService } from "src/app/services/products-api.service";

@Component({
  selector: "vex-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
  product: Produto;

  constructor(
    private productService: ProductsApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(["/apps/aio-table"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/apps/aio-table"]);
  }
}
