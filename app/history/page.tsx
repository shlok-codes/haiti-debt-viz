export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex justify-center px-4 py-8">
      <article className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Historical Context</h1>
          <p className="text-sm text-slate-300">
            This project focuses on Haiti&apos;s so-called &quot;independence
            debt&quot; and the related 1825 loan, often called the
            &quot;double debt.&quot; The visualization is not a complete
            picture of all foreign debts Haiti ever carried; it centers on this
            specific, exceptionally documented episode.
          </p>
        </header>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Independence and the 1825 Ordinance</h2>
          <p>
            Haiti declared independence from France in 1804 after a successful
            revolution led by enslaved and formerly enslaved people. For twenty
            years after independence, there was no formal indemnity; the new
            state struggled for recognition while facing diplomatic isolation
            and the threat of renewed invasion.
          </p>
          <p>
            In 1825, King Charles X of France issued an ordinance recognizing
            Haitian independence on the condition that Haiti pay an indemnity
            of 150 million gold francs to former slaveholders. French warships
            appeared off Haiti&apos;s coast to enforce this demand. The amount
            was later renegotiated in 1838 to a total of 90 million francs, but
            Haiti had already begun paying under extreme pressure.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">The &quot;Double Debt&quot;</h2>
          <p>
            Haiti did not have the cash to pay the indemnity upfront, so it
            turned to French banks for a large loan in 1825, guaranteed by
            future customs revenues. This meant Haiti was paying both the
            indemnity itself and interest and fees on the loan used to pay it —
            a structure historians sometimes call the &quot;double debt.&quot;
          </p>
          <p>
            Over the 19th century, a large share of Haiti&apos;s public revenue
            was diverted to service this debt. The New York Times&apos; 2022
            investigation, &quot;The Ransom,&quot; reconstructs year-by-year
            payments and outstanding balances using French, Haitian, and bank
            archives. Their reconstruction shows the indemnity and 1825 loan
            being effectively paid off by the late 1880s.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Why the Timeline Runs to 1947</h2>
          <p>
            The slider on this site runs from 1804 to 1947 for narrative
            reasons: 1804 marks independence, and 1947 is often cited as the
            year Haiti finished repaying certain later external debts under
            U.S. supervision. However, the detailed quantitative data we use
            here — the &quot;double debt&quot; series — is only available, with
            year-by-year precision, through the 19th century.
          </p>
          <p>
            For years before 1825 and after the double debt is paid, the
            visualization explicitly uses placeholder values of zero for
            payments and outstanding balance. The cards and notes in the UI
            explain this, and this history page makes clear that the chart is
            not attempting to show all of Haiti&apos;s foreign debt through
            1947. It focuses on the independence indemnity and the associated
            loan as reconstructed by modern historical research.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Limitations</h2>
          <p>
            This project is designed as a learning and visualization tool. It
            simplifies a complex financial and political history and relies
            heavily on secondary reconstructions of archival sources. It should
            not be treated as a definitive accounting of all payments Haiti
            made to foreign creditors. Instead, it aims to make one specific,
            well-documented debt visible over time and to encourage deeper
            reading in the underlying scholarship.
          </p>
        </section>
      </article>
    </main>
  );
}
