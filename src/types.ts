/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'monthly' | 'annual';

export interface PlanRate {
  INR: number;
  USD: number;
  EUR: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  baseMonthlyRate: PlanRate;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8; // 20% off applied programmatically

export class PriceEventBus {
  private listeners = new Set<(currency: Currency, billing: BillingCycle) => void>();

  subscribe(listener: (currency: Currency, billing: BillingCycle) => void) {
    this.listeners.add(listener);
    // Return an unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(currency: Currency, billing: BillingCycle) {
    this.listeners.forEach((listener) => {
      try {
        listener(currency, billing);
      } catch (error) {
        console.error('Error in PriceEventBus listener:', error);
      }
    });
  }
}
