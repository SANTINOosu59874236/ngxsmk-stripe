import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from './stripe.service';

@Component({
  selector: 'ngxsmk-stripe-subscription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-container">
      <div id="subscription-element"></div>
      <button class="pay-btn" (click)="subscribe()" [disabled]="loading">
        {{ loading ? 'Processing...' : 'Subscribe' }}
      </button>
    </div>
  `,
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripeSubscriptionComponent implements OnInit {
  @Input() publicKey!: string;
  @Input() clientSecret!: string; // SetupIntent secret from backend
  @Input() returnUrl!: string;
  @Input() appearance: any;
  @Input() locale: string = 'en';

  @Output() subscriptionSuccess = new EventEmitter<any>();
  @Output() subscriptionError = new EventEmitter<any>();

  loading = false;

  constructor(private readonly stripeService: StripeService) {}

  async ngOnInit() {
    await this.stripeService.init(this.publicKey);
    const { paymentElement } = await this.stripeService.createPaymentElement(this.clientSecret, {
      appearance: this.appearance,
      locale: this.locale
    });
    paymentElement.mount('#subscription-element');
  }

  async subscribe() {
    this.loading = true;
    try {
      const result = await this.stripeService.confirmSetupIntent(this.clientSecret, this.returnUrl);
      if (result.error) {
        this.subscriptionError.emit(result.error);
      } else {
        this.subscriptionSuccess.emit(result);
      }
    } catch (err) {
      this.subscriptionError.emit(err);
    } finally {
      this.loading = false;
    }
  }
}
