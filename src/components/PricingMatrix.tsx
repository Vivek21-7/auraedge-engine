/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Check, Info, Flame, Shield, Zap } from 'lucide-react';
import {
  Currency,
  BillingCycle,
  PricingPlan,
  PriceEventBus,
  ANNUAL_DISCOUNT_MULTIPLIER,
  CURRENCY_SYMBOLS
} from '../types';
import { pricingPlans } from '../data/pricing';

interface PricingControlsProps {
  eventBus: PriceEventBus;
  initialCurrency: Currency;
  initialBilling: BillingCycle;
}

/**
 * PricingControls isolates the interactive React state of the billing toggles and currency picker.
 * Changing currency or billing cycle triggers a state update ONLY inside this small control block.
 * It then dispatches the change to the cards via the eventBus, avoiding global parent re-renders.
 */
export function PricingControls({ eventBus, initialCurrency, initialBilling }: PricingControlsProps) {
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [billing, setBilling] = useState<BillingCycle>(initialBilling);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    eventBus.emit(newCurrency, billing);
  };

  const handleBillingChange = (newBilling: BillingCycle) => {
    setBilling(newBilling);
    eventBus.emit(currency, newBilling);
  };

  return (
    <div id="pricing-controls" className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-fade-in">
      {/* Billing Cycle Toggle */}
      <div className="bg-[#161618] p-1 rounded-xl flex items-center border border-[#262629] shadow-sm">
        <button
          id="btn-billing-monthly"
          type="button"
          onClick={() => handleBillingChange('monthly')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
            billing === 'monthly'
              ? 'bg-[#0A0A0B] text-white border border-[#262629] shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
        <button
          id="btn-billing-annual"
          type="button"
          onClick={() => handleBillingChange('annual')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            billing === 'annual'
              ? 'bg-[#0A0A0B] text-white border border-[#262629] shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Annual
          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-bold">
            -20%
          </span>
        </button>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-500">Currency:</span>
        <div className="relative inline-block">
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
            className="appearance-none bg-[#161618] border border-[#262629] text-white px-4 py-2 pr-8 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:bg-[#1a1a1d]"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlanCardProps {
  plan: PricingPlan;
  eventBus: PriceEventBus;
  initialCurrency: Currency;
  initialBilling: BillingCycle;
}

/**
 * PlanCard is aggressively memoized. It renders ONCE on mount and NEVER re-renders when billing or currency toggles are triggered.
 * Instead, it subscribes to the stable eventBus and directly updates localized DOM nodes via useRef.
 * This guarantees 100% state isolation and pristine rendering performance.
 */
const PlanCard = React.memo(function PlanCard({ plan, eventBus, initialCurrency, initialBilling }: PlanCardProps) {
  // 1. RE-RENDER ISOLATION LOGIC:
  // We use these refs to target only the DOM nodes containing the price string and the billing period.
  // When an event is emitted by the controls, these references are directly mutated.
  const priceRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const discountBadgeRef = useRef<HTMLSpanElement>(null);
  
  // Calculate price dynamically from the source-of-truth matrix
  const getCalculatedPrice = (curr: Currency, cycle: BillingCycle) => {
    const base = plan.baseMonthlyRate[curr];
    const multiplier = cycle === 'annual' ? ANNUAL_DISCOUNT_MULTIPLIER : 1;
    const computed = base * multiplier;
    
    // Format according to local conventions (INR gets formatted cleanly, USD/EUR rounded)
    const symbol = CURRENCY_SYMBOLS[curr];
    if (curr === 'INR') {
      return `${symbol}${Math.round(computed).toLocaleString('en-IN')}`;
    }
    return `${symbol}${Math.round(computed)}`;
  };

  useEffect(() => {
    // A. Initialize values through direct DOM manipulation on mount
    if (priceRef.current) {
      priceRef.current.textContent = getCalculatedPrice(initialCurrency, initialBilling);
    }
    if (periodRef.current) {
      periodRef.current.textContent = initialBilling === 'monthly' ? '/mo' : '/yr';
    }
    if (discountBadgeRef.current) {
      discountBadgeRef.current.style.display = initialBilling === 'annual' ? 'inline-block' : 'none';
    }

    // B. Subscribe to event bus for dynamic updates without triggering React re-renders!
    const unsubscribe = eventBus.subscribe((currency, billing) => {
      // Direct DOM Mutator:
      if (priceRef.current) {
        priceRef.current.textContent = getCalculatedPrice(currency, billing);
      }
      if (periodRef.current) {
        periodRef.current.textContent = billing === 'monthly' ? '/mo' : '/yr';
      }
      if (discountBadgeRef.current) {
        discountBadgeRef.current.style.display = billing === 'annual' ? 'inline-block' : 'none';
      }
    });

    return unsubscribe;
  }, [eventBus, initialCurrency, initialBilling]);

  // Icon pairing for each tier
  const renderCardIcon = () => {
    if (plan.id === 'starter') return <Zap id="icon-starter" className="w-6 h-6 text-blue-400" />;
    if (plan.id === 'pro') return <Flame id="icon-pro" className="w-6 h-6 text-amber-400" />;
    return <Shield id="icon-enterprise" className="w-6 h-6 text-blue-500" />;
  };

  return (
    <div
      id={`plan-card-${plan.id}`}
      className={`relative bg-[#161618] rounded-3xl p-8 border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        plan.isPopular
          ? 'highlight-card border-blue-500 shadow-lg scale-102 z-10 md:ring-4 md:ring-blue-500/10'
          : 'border-[#262629] shadow-sm'
      }`}
    >
      {plan.isPopular && (
        <span
          id="badge-popular"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm"
        >
          Most Popular
        </span>
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 id={`plan-title-${plan.id}`} className="text-xl font-bold font-secondary text-white">
          {plan.name}
        </h3>
        <div className="p-2.5 bg-[#0A0A0B] rounded-xl border border-[#262629]">
          {renderCardIcon()}
        </div>
      </div>
      
      <p id={`plan-desc-${plan.id}`} className="text-sm text-zinc-400 min-h-[48px] mb-6">
        {plan.description}
      </p>

      {/* Price section - ZERO RE-RENDER HOOKED NODES */}
      <div className="mb-6 flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          {/* 
            CRITICAL REF INTEGRATION: 
            The price value and billing cycle string below are rendered inside empty or pre-filled elements 
            and targeted by refs. They receive direct updates when billing/currency changes, completely bypassing 
            React re-rendering of this card tree.
          */}
          <span
            ref={priceRef}
            id={`price-display-${plan.id}`}
            className="text-4xl md:text-5xl font-extrabold font-secondary text-white tracking-tight"
          >
            {/* Populated programmatically */}
          </span>
          <span
            ref={periodRef}
            id={`period-display-${plan.id}`}
            className="text-sm font-semibold text-zinc-500"
          >
            {/* Populated programmatically */}
          </span>
        </div>
        
        {/* Under-price discount label */}
        <span
          ref={discountBadgeRef}
          id={`discount-badge-${plan.id}`}
          className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md self-start"
          style={{ display: 'none' }}
        >
          20% Annual Discount Applied
        </span>
      </div>

      <button
        id={`btn-cta-${plan.id}`}
        type="button"
        className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 cursor-pointer ${
          plan.isPopular
            ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-md'
            : 'bg-[#1F1F22] border border-[#2D2D31] hover:bg-[#262629] text-zinc-300'
        }`}
      >
        {plan.ctaText}
      </button>

      {/* Divider */}
      <div className="h-px bg-[#262629] my-6" />

      {/* Features List */}
      <div className="space-y-3.5">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
          What's included:
        </p>
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="mt-0.5 p-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-sm text-zinc-300 leading-tight">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function PricingMatrix() {
  const initialCurrency: Currency = 'USD';
  const initialBilling: BillingCycle = 'monthly';

  // Instantiate the single event bus and memoize it so it remains perfectly stable
  const eventBus = useMemo(() => new PriceEventBus(), []);

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#262629]">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-800/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-400 tracking-wider uppercase mb-4 animate-fade-in">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          High-performance Pricing
        </div>
        <h2 id="pricing-heading" className="text-4xl md:text-5xl font-extrabold font-secondary tracking-tight text-white mb-4">
          Fair, Transparent Pricing plans
        </h2>
        <p className="text-lg text-zinc-400">
          Scale effortlessly from simple ideas to planetary-grade systems. No hidden fees.
          Toggle below and observe zero React profiling re-renders.
        </p>
      </div>

      {/* Toggles - Holds localized state */}
      <PricingControls
        eventBus={eventBus}
        initialCurrency={initialCurrency}
        initialBilling={initialBilling}
      />

      {/* Card Grid - Grid layout never re-renders, updates are isolated inside price nodes */}
      <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            eventBus={eventBus}
            initialCurrency={initialCurrency}
            initialBilling={initialBilling}
          />
        ))}
      </div>

      {/* Interactive notice panel */}
      <div id="profiling-notice" className="mt-12 max-w-3xl mx-auto bg-[#161618] border border-[#262629] rounded-2xl p-5 text-center shadow-sm">
        <p className="text-xs font-mono text-zinc-400 flex items-center justify-center gap-2 leading-relaxed">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <strong>PROFILER METRICS LOCK ACTIVE:</strong> Card component structures are wrapped in React.memo with DOM-level ref bindings. Toggling billing cycles or currencies triggers 0 (zero) Card re-renders.
        </p>
      </div>
    </section>
  );
}
