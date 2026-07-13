"use client";

import { useState } from "react";

/**
 * [NEW – UX] Indicative interest-free calculator. Uses ONLY the terms
 * published on this page (0% / 24–60 months). Not a credit offer.
 */
export function FinanceCalculator() {
  const [amount, setAmount] = useState(3000);
  const [months, setMonths] = useState(36);
  const monthly = amount > 0 ? amount / months : 0;

  return (
    <section className="mt-10 rounded-card border border-line bg-soft p-6 sm:p-8">
      <h2 className="text-2xl">Estimate your monthly payments</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-semibold text-primary">Treatment cost (£)</span>
          <input
            type="number"
            min={0}
            max={20000}
            step={100}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-3"
          />
        </label>
        <label className="block">
          <span className="font-semibold text-primary">Spread over (months)</span>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-3"
          >
            {[24, 36, 48, 60].map((m) => (
              <option key={m} value={m}>
                {m} months
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-6 text-lg">
        Interest-free monthly payment:{" "}
        <strong className="text-2xl text-primary">
          £{monthly.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
        </strong>
      </p>
      <p className="mt-3 text-sm text-body/70">
        Indicative figure only, based on the interest-free plan described on this page. Exact terms,
        eligibility and repayments are confirmed at your consultation and subject to status.
      </p>
    </section>
  );
}
