/**
 * Mortgage Calculator for Dominican Republic banks
 * Includes rates from Popular, BHD, BAF, Bupa, and others
 */

"use client";

import { useState, useMemo } from "react";
import { DollarSign, Calendar, Percent, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MortgageRate {
  bank: string;
  bankCode: string;
  rate: number;
  minDownPayment: number;
  maxTerm: number;
  type: "fijo" | "variable";
  currency: "USD" | "DOP";
}

export const DOMINICAN_BANKS: MortgageRate[] = [
  { bank: "Banco Popular", bankCode: "popular", rate: 12.5, minDownPayment: 30, maxTerm: 20, type: "fijo", currency: "USD" },
  { bank: "BHD", bankCode: "bhd", rate: 13.0, minDownPayment: 30, maxTerm: 20, type: "fijo", currency: "USD" },
  { bank: "Banco de las Fuerzas Armadas", bankCode: "baf", rate: 10.5, minDownPayment: 20, maxTerm: 20, type: "fijo", currency: "USD" },
  { bank: "Bupa Bank", bankCode: "bupa", rate: 14.0, minDownPayment: 40, maxTerm: 15, type: "fijo", currency: "USD" },
  { bank: "Banco Popularen", bankCode: "popular_dop", rate: 15.5, minDownPayment: 30, maxTerm: 20, type: "fijo", currency: "DOP" },
  { bank: "Garoza Bank", bankCode: "garoza", rate: 16.0, minDownPayment: 40, maxTerm: 15, type: "fijo", currency: "DOP" },
];

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: Date;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface MortgageCalculatorProps {
  propertyPrice: number;
  currency?: "USD" | "DOP";
  exchangeRate?: number;
  showResult?: boolean;
  className?: string;
}

export function MortgageCalculator({
  propertyPrice,
  currency = "USD",
  exchangeRate = 60,
  showResult = false,
  className,
}: MortgageCalculatorProps) {
  const [selectedBank, setSelectedBank] = useState<MortgageRate>(DOMINICAN_BANKS[0]);
  const [downPaymentPercent, setDownPaymentPercent] = useState(selectedBank.minDownPayment);
  const [termYears, setTermYears] = useState(20);
  const [showResultState, setShowResultState] = useState(showResult);

  const effectivePrice = currency !== selectedBank.currency
    ? selectedBank.currency === "USD"
      ? propertyPrice / (exchangeRate || 60)
      : propertyPrice * (exchangeRate || 60)
    : propertyPrice;

  const downPayment = useMemo(() => {
    return Math.round(effectivePrice * (downPaymentPercent / 100));
  }, [effectivePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return effectivePrice - downPayment;
  }, [effectivePrice, downPayment]);

  const result = useMemo((): MortgageResult | null => {
    if (!showResultState) return null;
    if (loanAmount <= 0) return null;

    const annualRate = selectedBank.rate / 100;
    const monthlyRate = annualRate / 12;
    const numPayments = termYears * 12;

    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;

    const payoffDate = new Date();
    payoffDate.setFullYear(payoffDate.getFullYear() + termYears);

    const amortizationSchedule: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let i = 1; i <= Math.min(numPayments, 60); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (i <= 12 || i % 12 === 0 || i === numPayments) {
        amortizationSchedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate,
      amortizationSchedule,
    };
  }, [selectedBank, downPaymentPercent, termYears, loanAmount, showResultState]);

  const formatCurrency = (amount: number) => {
    return selectedBank.currency === "USD" 
      ? `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `RD$${Math.round(amount).toLocaleString("es-DO")}`;
  };

  return (
    <div className={cn("rounded-xl border border-border bg-white p-6 shadow-sm", className)}>
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-emerald-brand" />
        <h3 className="text-lg font-semibold text-navy">Calculadora de Hipoteca</h3>
        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
      </div>

      {/* Property price display */}
      <div className="mb-6 rounded-lg bg-emerald-50 p-4">
        <p className="text-sm text-muted-foreground">Precio de la propiedad</p>
        <p className="text-2xl font-bold text-navy">
          {selectedBank.currency === "USD" 
            ? `$${effectivePrice.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
            : `RD$${Math.round(effectivePrice).toLocaleString("es-DO")}`}
        </p>
      </div>

      {/* Bank selector */}
      <div className="mb-4 space-y-2">
        <label className="text-sm font-medium text-navy">Banco</label>
        <select
          value={selectedBank.bankCode}
          onChange={(e) => {
            const bank = DOMINICAN_BANKS.find(b => b.bankCode === e.target.value);
            if (bank) {
              setSelectedBank(bank);
              setDownPaymentPercent(bank.minDownPayment);
            }
          }}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-emerald-brand focus:outline-none focus:ring-2 focus:ring-emerald-brand/20"
        >
          {DOMINICAN_BANKS.map(bank => (
            <option key={bank.bankCode} value={bank.bankCode}>
              {bank.bank} ({bank.rate}% - {bank.type})
            </option>
          ))}
        </select>
      </div>

      {/* Down payment slider */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-navy flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Abono inicial
          </label>
          <span className="text-sm font-semibold text-emerald-brand">{downPaymentPercent}%</span>
        </div>
        <input
          type="range"
          min={selectedBank.minDownPayment}
          max={90}
          step={5}
          value={downPaymentPercent}
          onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
          className="w-full accent-emerald-brand"
        />
        <p className="text-sm text-muted-foreground">
          {selectedBank.currency === "USD" 
            ? `$${downPayment.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
            : `RD$${downPayment.toLocaleString("es-DO")}`} ({downPaymentPercent}% del precio)
        </p>
      </div>

      {/* Loan amount */}
      <div className="mb-4 rounded-lg bg-gray-50 p-3">
        <p className="text-sm text-muted-foreground">Monto a financiar</p>
        <p className="text-xl font-bold text-navy">{formatCurrency(loanAmount)}</p>
      </div>

      {/* Term slider */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-navy flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Plazo
          </label>
          <span className="text-sm font-semibold text-emerald-brand">{termYears} años</span>
        </div>
        <input
          type="range"
          min={1}
          max={selectedBank.maxTerm}
          step={1}
          value={termYears}
          onChange={(e) => setTermYears(Number(e.target.value))}
          className="w-full accent-emerald-brand"
        />
      </div>

      {/* Interest rate display */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-yellow-50 p-3">
        <Percent className="h-4 w-4 text-yellow-600" />
        <div>
          <p className="text-sm text-muted-foreground">Tasa de interés anual</p>
          <p className="text-sm font-semibold text-navy">
            {selectedBank.rate}% ({selectedBank.type})
          </p>
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={() => setShowResultState(!showResultState)}
        className={cn(
          "w-full rounded-lg px-4 py-3 font-semibold transition-colors",
          showResultState
            ? "border-2 border-emerald-brand text-emerald-brand hover:bg-emerald-50"
            : "bg-emerald-brand text-white hover:bg-emerald-700"
        )}
      >
        {showResultState ? "Ocultar resultado" : "Calcular cuota mensual"}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
          {/* Monthly payment - big display */}
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">Tu cuota mensual sería</p>
            <p className="text-3xl font-bold text-emerald-800">
              {formatCurrency(result.monthlyPayment)}
            </p>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/80 p-3">
              <p className="text-xs text-muted-foreground">Total a pagar</p>
              <p className="text-sm font-bold text-navy">{formatCurrency(result.totalPayment)}</p>
            </div>
            <div className="rounded-lg bg-white/80 p-3">
              <p className="text-xs text-muted-foreground">Total intereses</p>
              <p className="text-sm font-bold text-red-500">{formatCurrency(result.totalInterest)}</p>
            </div>
            <div className="rounded-lg bg-white/80 p-3">
              <p className="text-xs text-muted-foreground">Costo total del inmueble</p>
              <p className="text-sm font-bold text-navy">{formatCurrency(result.totalPayment + downPayment)}</p>
            </div>
            <div className="rounded-lg bg-white/80 p-3">
              <p className="text-xs text-muted-foreground">Interés % del total</p>
              <p className="text-sm font-bold text-navy">
                {((result.totalInterest / (result.totalPayment + downPayment)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Amortization preview */}
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Ver tabla de amortización (primeros 12 meses)
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-200">
                    <th className="pb-2 pr-3 text-left font-medium text-muted-foreground">#</th>
                    <th className="pb-2 pr-3 text-right font-medium text-muted-foreground">Cuota</th>
                    <th className="pb-2 pr-3 text-right font-medium text-muted-foreground">Capital</th>
                    <th className="pb-2 pr-3 text-right font-medium text-muted-foreground">Interés</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortizationSchedule
                    .filter((row: AmortizationRow) => row.month <= 12 || row.month % 12 === 0)
                    .map((row: AmortizationRow, i: number) => (
                      <tr key={i} className="border-b border-emerald-100">
                        <td className="py-2 pr-3 font-medium">{row.month}</td>
                        <td className="py-2 pr-3 text-right">{formatCurrency(row.payment)}</td>
                        <td className="py-2 pr-3 text-right text-emerald-600">{formatCurrency(row.principal)}</td>
                        <td className="py-2 pr-3 text-right text-red-500">{formatCurrency(row.interest)}</td>
                        <td className="py-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            * Las tasas son referenciales y pueden variar según el banco y tu perfil crediticio. 
            Consulta con tu banco para una cotización exacta.
          </p>
        </div>
      )}
    </div>
  );
}