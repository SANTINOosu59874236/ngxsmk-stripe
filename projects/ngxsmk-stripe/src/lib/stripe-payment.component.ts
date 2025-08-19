import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from './stripe.service';

@Component({
  selector: 'ngxsmk-stripe-payment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-container">
      <div id="payment-element"></div>
      <button class="pay-btn" (click)="pay()" [disabled]="loading">
        {{ loading ? 'Processing...' : 'Pay Now' }}
      </button>
    </div>
  `,
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  @Input() publicKey!: string;
  @Input() clientSecret!: string;
  @Input() returnUrl!: string;
  @Input() appearance: any;
  @Input() locale: string = 'en';

  @Output() paymentSuccess = new EventEmitter<any>();
  @Output() paymentError = new EventEmitter<any>();

  loading = false;

  constructor(private readonly stripeService: StripeService) {}

  async ngOnInit() {
    await this.stripeService.init(this.publicKey);
    const { paymentElement } = await this.stripeService.createPaymentElement(this.clientSecret, {
      appearance: this.appearance,
      locale: this.locale
    });
    paymentElement.mount('#payment-element');
  }

  async pay() {
    this.loading = true;
    try {
      const result = await this.stripeService.confirmPayment(this.clientSecret, this.returnUrl);
      if (result.error) {
        this.paymentError.emit(result.error);
      } else {
        this.paymentSuccess.emit(result);
      }
    } catch (err) {
      this.paymentError.emit(err);
    } finally {
      this.loading = false;
    }
  }
}
