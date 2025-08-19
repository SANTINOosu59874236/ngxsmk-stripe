import {Component} from '@angular/core';
import {StripePaymentComponent, StripeSubscriptionComponent} from 'ngxsmk-stripe';

@Component({
  selector: 'app-root',
  imports: [StripePaymentComponent, StripeSubscriptionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  publicKey: string = 'pk_test_xxxxxxxxxxxxx'; // Replace it with a real key
  paymentClientSecret = 'pi_xxxxx_secret_xxxxx'; // From backend
  subscriptionClientSecret = 'seti_xxxxx_secret_xxxxx'; // SetupIntent from backend
  returnUrl: string = 'http://localhost:4200/success';

  appearance = {
    theme: 'stripe',
    variables: {colorPrimary: '#ff5733'}
  };

  onPaymentSuccess(ev: any) {
    console.log('Payment success', ev);
  }

  onPaymentError(err: any) {
    console.error('Payment error', err);
  }

  onSubSuccess(ev: any) {
    console.log('Subscription success', ev);
  }

  onSubError(err: any) {
    console.error('Subscription error', err);
  }
}
