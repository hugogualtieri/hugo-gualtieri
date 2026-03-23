"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ScrollReveal from "./ScrollReveal";

const monthlyData = [
  { month: "Sep", adsense: 180, affiliate: 320, stripe: 450, other: 90 },
  { month: "Oct", adsense: 210, affiliate: 380, stripe: 520, other: 110 },
  { month: "Nov", adsense: 250, affiliate: 410, stripe: 680, other: 130 },
  { month: "Déc", adsense: 310, affiliate: 520, stripe: 750, other: 160 },
  { month: "Jan", adsense: 340, affiliate: 580, stripe: 890, other: 190 },
  { month: "Fév", adsense: 380, affiliate: 640, stripe: 1020, other: 220 },
  { month: "Mar", adsense: 420, affiliate: 710, stripe: 1180, other: 250 },
];

const totalRevenue = monthlyData[monthlyData.length - 1];
const currentTotal =
  totalRevenue.adsense + totalRevenue.affiliate + totalRevenue.stripe + totalRevenue.other;

const sources = [
  { label: "Stripe", value: totalRevenue.stripe, color: "bg-revenue-stripe", dot: "hsl(240, 50%, 55%)" },
  { label: "Affiliation", value: totalRevenue.affiliate, color: "bg-revenue-affiliate", dot: "hsl(25, 85%, 55%)" },
  { label: "AdSense", value: totalRevenue.adsense, color: "bg-revenue-adsense", dot: "hsl(168, 45%, 32%)" },
  { label: "Autre", value: totalRevenue.other, color: "bg-revenue-other", dot: "hsl(340, 60%, 55%)" },
];

const RevenueDashboard = () => {
  return (
    <section id="revenue" className="py-24 md:py-32 section-padding bg-card">
      <div className="container">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Revenus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparence totale
          </h2>
          <p className="text-muted-foreground max-w-xl mb-12">
            Je partage l&apos;évolution de mes revenus en toute transparence.
            Chaque source est détaillée mois par mois.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          <ScrollReveal delay={100}>
            <div className="p-6 rounded-xl bg-surface-elevated border">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Revenus mensuels (mars)</p>
                  <p className="text-3xl font-bold tabular-nums">{currentTotal.toLocaleString("fr-FR")} &euro;</p>
                </div>
                <p className="text-sm text-primary font-medium">+18% vs fév</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 10%, 88%)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(220, 10%, 50%)" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(220, 10%, 50%)" }}
                      tickFormatter={(v) => `${v}\u20AC`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 10%, 88%)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                      formatter={(value) => [`${value} \u20AC`]}
                    />
                    <Bar dataKey="stripe" stackId="a" fill="hsl(240, 50%, 55%)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="affiliate" stackId="a" fill="hsl(25, 85%, 55%)" />
                    <Bar dataKey="adsense" stackId="a" fill="hsl(168, 45%, 32%)" />
                    <Bar dataKey="other" stackId="a" fill="hsl(340, 60%, 55%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Répartition
              </p>
              {sources.map((source) => (
                <div key={source.label} className="p-4 rounded-xl bg-surface-elevated border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: source.dot }}
                      />
                      <span className="text-sm font-medium">{source.label}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {source.value.toLocaleString("fr-FR")} &euro;
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(source.value / currentTotal) * 100}%`,
                        backgroundColor: source.dot,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default RevenueDashboard;
