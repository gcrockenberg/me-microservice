import { Injectable } from '@angular/core';
import { IOrderCheckout, IOrderItem, IOrderDetails, IOrderSummary, ICheckoutResponse } from 'src/app/models/order/order.model';
import { CartService } from '../cart/cart.service';
import { SecurityService } from '../security/security.service';
import { UserData } from 'src/app/models/security/user-data.model';
import { ICart } from 'src/app/models/cart/cart.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { DataService } from '../data/data.service';
import { ICartCheckout } from 'src/app/models/cart/cart-checkout.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _ordersUrl: string = '';

  constructor(
    private _cartService: CartService,
    private _securityService: SecurityService,
    private _configurationService: ConfigurationService,
    private _dataService: DataService) {

      _configurationService.whenReady
        .subscribe(() => this._ordersUrl = this._configurationService.serverSettings.orderUrl + '/o/api/v1/orders/')
  }


  /**
   * Creates an Order from all items in the Cart
   * TODO: Switch to accept ICart parameter to control which CartItems to process
   * @returns The Order object
   */
  createOrderFromCartAndIdentity(): IOrderCheckout {
    let order: IOrderCheckout = <IOrderCheckout>{};
    let cart: ICart = this._cartService.cart;
    let identityInfo: UserData = this._securityService.userData;

    // Identity data mapping
    order.street = (identityInfo.streetAddress) ? identityInfo.streetAddress : '';
    order.city = (identityInfo.city) ? identityInfo.city : '';
    order.country = (identityInfo.country) ? identityInfo.country : '';
    order.state = (identityInfo.state) ? identityInfo.state : '';
    order.zipcode = (identityInfo.postalCode) ? identityInfo.postalCode : '';
    order.cardexpiration = new Date(Date.now());
    order.cardnumber = '';
    order.cardsecuritynumber = '';
    order.cardtypeid = 0;
    order.cardholdername = `${identityInfo.givenName} ${identityInfo.surName}`;
    order.total = 0;
    order.expiration = '';

    // Cart data mapping
    order.cartSessionId = cart.sessionId;
    order.orderItems = new Array<IOrderItem>();
    cart.items.forEach(x => {
      let item: IOrderItem = <IOrderItem>{};
      item.pictureurl = x.pictureUrl;
      item.productId = +x.productId;
      item.productname = x.productName;
      item.unitprice = x.unitPrice;
      item.units = x.quantity;

      order.total += (item.unitprice * item.units);

      order.orderItems.push(item);
    });

    return order;
  }


  getOrders(): Observable<IOrderSummary[]> {
    return this._configurationService.whenReady
      .pipe(switchMap(x => {
          let url = this._ordersUrl;

          return this._dataService.get(url)
            .pipe<IOrderSummary[]>(
              tap((response: any) => {
                return (response) ? response : of([]);
              }));
        }));
  }


  getOrderStatus(orderId: number): Observable<IOrderDetails> {
    if (1 > orderId) return of(<IOrderDetails>{});

    return this._configurationService.whenReady
      .pipe(switchMap(x => {
          let url = `${this._ordersUrl}${orderId}`;

          return this._dataService.get(url)
            .pipe<IOrderDetails>(
              tap((response: any) => {
                return (response) ? response : of([]);
              }));
        }));
  }


  setCartCheckout(cartCheckout: ICartCheckout): Observable<ICheckoutResponse> {
    return this._configurationService.whenReady
      .pipe(switchMap(x => {
          let url: string = this._ordersUrl + 'checkout';

          return this._dataService.post<ICheckoutResponse>(url, cartCheckout)
            .pipe(
              tap((response: ICheckoutResponse) => {
                console.log('--> checkout response: ', response);
                // Cleared on the server upon success. Clearing here reinforces user experience.
                this._cartService.clearCart();
                
              }));
        }));
  }


}
