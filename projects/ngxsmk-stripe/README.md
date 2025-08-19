# 📦 ngxsmk-stripe

> Angular 17+ plugin for integrating **Stripe payments** (one-time & subscriptions) with theme customization, event emitters, and standalone components.

---

## 🚀 Features
- 💳 One-time payments via Stripe PaymentElement
- 🔄 Subscriptions / recurring billing via SetupIntent
- 🎨 Theming & Appearance API (Stripe + SCSS variables)
- 🌍 Localization support (`locale` input)
- ✅ Event emitters for success/error handling
- 🔧 Built with standalone Angular components (Angular 17+)

---

## 📥 Installation

```bash
npm install ngxsmk-stripe @stripe/stripe-js
```

---

## ⚡ Quick Start

### Import in Standalone Component

```ts
import { Component } from '@angular/core';
import { StripePaymentComponent, StripeSubscriptionComponent } from 'ngxsmk-stripe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StripePaymentComponent, StripeSubscriptionComponent],
  template: `
    <h1>ngxsmk-stripe Demo</h1>

    <!-- One-time Payment -->
    <ngxsmk-stripe-payment
      [publicKey]="publicKey"
      [clientSecret]="paymentClientSecret"
      [returnUrl]="returnUrl"
      [appearance]="appearance"
      (paymentSuccess)="onPaymentSuccess($event)"
      (paymentError)="onPaymentError($event)">
    </ngxsmk-stripe-payment>

    <!-- Subscription -->
    <ngxsmk-stripe-subscription
      [publicKey]="publicKey"
      [clientSecret]="subscriptionClientSecret"
      [returnUrl]="returnUrl"
      [appearance]="appearance"
      (subscriptionSuccess)="onSubSuccess($event)"
      (subscriptionError)="onSubError($event)">
    </ngxsmk-stripe-subscription>
  `
})
export class AppComponent {
  publicKey = 'pk_test_xxxxxxxxxxxxx'; // Your Stripe publishable key
  paymentClientSecret = 'pi_xxxxx_secret_xxxxx'; // From backend (PaymentIntent)
  subscriptionClientSecret = 'seti_xxxxx_secret_xxxxx'; // From backend (SetupIntent)
  returnUrl = 'http://localhost:4200/success';

  appearance = {
    theme: 'stripe',
    variables: { colorPrimary: '#ff5733' }
  };

  onPaymentSuccess(ev: any) { console.log('✅ Payment success', ev); }
  onPaymentError(err: any) { console.error('❌ Payment error', err); }
  onSubSuccess(ev: any) { console.log('✅ Subscription success', ev); }
  onSubError(err: any) { console.error('❌ Subscription error', err); }
}
```

---

## 🎨 Theming & Customization

### Stripe Appearance API
```ts
appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#ff5733',
    fontSizeBase: '16px'
  }
};
```

### SCSS Theming
Override global variables in your `styles.scss`:
```scss
$primary-color: #ff5733;
$btn-text: #fff;
```

---

## 📡 Backend Setup

Create secrets on your backend.

**One-time payments (PaymentIntent):**
```js
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1999,
  currency: "usd",
  automatic_payment_methods: { enabled: true },
});
res.send({ clientSecret: paymentIntent.client_secret });
```

**Subscriptions (SetupIntent):**
```js
const setupIntent = await stripe.setupIntents.create({
  customer: "cus_xxxxx", // existing customer id
  payment_method_types: ["card"],
});
res.send({ clientSecret: setupIntent.client_secret });
```

---

## ⚙️ Inputs

| Input          | Type     | Default | Description |
|----------------|----------|---------|-------------|
| `publicKey`    | string   | —       | Stripe publishable key |
| `clientSecret` | string   | —       | Client secret from backend (PaymentIntent or SetupIntent) |
| `returnUrl`    | string   | —       | Where to redirect after payment/subscription |
| `appearance`   | object   | `null`  | Stripe Appearance API object |
| `locale`       | string   | `en`    | Language/locale for Stripe Elements |

---

## 📤 Outputs

### For `ngxsmk-stripe-payment`
- `(paymentSuccess)` → emits payment result
- `(paymentError)` → emits error

### For `ngxsmk-stripe-subscription`
- `(subscriptionSuccess)` → emits subscription result
- `(subscriptionError)` → emits error

---

## 🛠 Development & Build

```bash
# Build the library
ng build ngxsmk-stripe

# Run demo app
ng serve demo-app
```

---

## 📦 Publishing

```bash
cd dist/ngxsmk-stripe
npm publish --access public
```

---

## 📜 License
MIT
```
Last updated: 2025-08-19
