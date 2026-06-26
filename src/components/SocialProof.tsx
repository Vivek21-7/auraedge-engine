/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote, Star } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'VP of Infrastructure, Veloce Labs',
      quote: 'We migrated our multi-tenant SaaS to AuraEdge. The PricingMatrix direct DOM mutation allowed us to easily preview custom billing tiers with zero layout lag, and our global response times dropped to single-digit milliseconds.',
      rating: 5,
    },
    {
      name: 'Ananya Sharma',
      role: 'Chief Architect, FinFlow Systems',
      quote: 'The security context lock feature in the Bento grid was the deciding factor. The ability to programmatically mutate and securely rotate encryption parameters in real-time, isolated strictly inside local containers, is game-changing.',
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#0A0A0B] border-t border-[#262629]">
      <div className="max-w-7xl mx-auto">
        {/* Logos line */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">
            Trusted by the world's most latency-sensitive developers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-lg text-zinc-500 font-secondary">Acme Systems</span>
            <span className="font-extrabold text-lg text-zinc-500 font-secondary">Linear Tech</span>
            <span className="font-extrabold text-lg text-zinc-500 font-secondary">Retool Pro</span>
            <span className="font-extrabold text-lg text-zinc-500 font-secondary">Prisma Edge</span>
            <span className="font-extrabold text-lg text-zinc-500 font-secondary">Stripe SaaS</span>
          </div>
        </div>

        {/* Testimonials divider */}
        <div className="h-px bg-[#262629] my-16 max-w-5xl mx-auto" />

        {/* Actual Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#161618] border border-[#262629] rounded-3xl p-8 relative hover:border-zinc-700 transition-all duration-300 hover:shadow-md"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-zinc-800" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 italic leading-relaxed text-sm mb-6">
                "{t.quote}"
              </p>

              {/* User details */}
              <div>
                <p className="text-sm font-bold text-white font-secondary">{t.name}</p>
                <p className="text-xs text-zinc-500 font-mono">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
