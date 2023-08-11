import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedProductsComponent } from "../../components/catalog/related-products/related-products.component";
import { ICatalogItem } from 'src/app/models/catalog/catalog-item.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CatalogItemModalComponent } from "../../components/catalog/catalog-item-modal/catalog-item-modal.component";

@Component({
    selector: 'app-product-details',
    standalone: true,
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    imports: [CommonModule, RelatedProductsComponent, CatalogItemModalComponent]
})
export class ProductDetailsComponent implements OnInit {
  readonly itemLoaded: WritableSignal<boolean> = signal(false);
  readonly item: WritableSignal<ICatalogItem> = signal(<ICatalogItem>{});

  constructor(
    private _cartService: CartService, 
    private _route: ActivatedRoute, 
    private _catalogService: CatalogService) { }

  addToCart() {
    this._cartService.addCatalogItemToCart(this.item());
  }

  ngOnInit() {
    this._route.paramMap
      .pipe(
        switchMap((params) => {
          let productId = Number(params.get('id'));
          return this._catalogService.getCatalogItem(productId)
        })).subscribe((catalogItem) => {
          this.item.set(catalogItem);
          this.itemLoaded.set(true);
        });
  }
}