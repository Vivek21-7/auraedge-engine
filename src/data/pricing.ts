/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingPlan } from '../types';

export const pricingMatrix: Record<string, PricingPlan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams and side-projects looking to launch fast.',
    baseMonthlyRate: { INR: 999, USD: 12, EUR: 11 },
    features: [
      '5 active deployment domains',
      '10GB superfast storage allocation',
      'Core quantum usage statistics',
      'Standard community support lines',
      '1 pre-built custom integration'
    ],
    ctaText: 'Deploy Starter Now'
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For fast-growing organizations requiring top tier scale and latency.',
    baseMonthlyRate: { INR: 2499, USD: 29, EUR: 27 },
    features: [
      'Unlimited deployment domains',
      '100GB superfast storage allocation',
      'Real-time detailed usage statistics',
      '24/7 dedicated prioritize support',
      '10 advanced custom integrations',
      'Fully branded custom domain proxy'
    ],
    ctaText: 'Activate Pro Trial',
    isPopular: true
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For enterprise organizations demanding bespoke parameters and SLA.',
    baseMonthlyRate: { INR: 7999, USD: 99, EUR: 92 },
    features: [
      'Bespoke bare-metal architecture',
      '1TB storage allocation with RAID-10',
      'Bespoke zero-latency sync network',
      'Dedicated premium support manager',
      'Bespoke unlimited API custom adapters',
      'Signed custom security SLA contract'
    ],
    ctaText: 'Connect with Sales'
  }
};

export const pricingPlans = Object.values(pricingMatrix);
