import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  async init(publicKey: string) {
    if (!this.stripe) {
      this.stripe = await loadStripe(publicKey);
    }
  }

  async createPaymentElement(clientSecret: string, options?: any) {
    if (!this.stripe) throw new Error('Stripe not initialized');

    this.elements = this.stripe.elements({
      clientSecret,
      appearance: options?.appearance,
      locale: options?.locale ?? 'en'
    });

    const paymentElement = this.elements.create('payment', {
      layout: options?.layout ?? 'tabs'
    });

    return { paymentElement, elements: this.elements };
  }

  async confirmPayment(clientSecret: string, returnUrl: string) {
    if (!this.stripe || !this.elements) throw new Error('Stripe not initialized');

    return await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: { return_url: returnUrl }
    });
  }

  async confirmSetupIntent(clientSecret: string, returnUrl: string) {
    if (!this.stripe || !this.elements) throw new Error('Stripe not initialized');

    return await this.stripe.confirmSetup({
      elements: this.elements,
      confirmParams: { return_url: returnUrl }
    });
  }
}
