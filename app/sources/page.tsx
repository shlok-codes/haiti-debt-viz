export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex justify-center px-4 py-8">
      <article className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Sources & Methodology</h1>
          <p className="text-sm text-slate-300">
            This project relies on published historical research and one
            especially important quantitative dataset. It does not introduce
            new archival findings; instead, it translates existing work into an
            interactive visualization.
          </p>
        </header>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Core Quantitative Dataset</h2>
          <p>
            The yearly series for payments and outstanding balance on the
            &quot;double debt&quot; (indemnity plus 1825 loan) is derived from
            the data published by{" "}
            <span className="italic">The New York Times</span> as part of its
            2022 investigation &quot;The Ransom.&quot; The Times team drew on
            French, Haitian, and bank archives and released a CSV file
            containing:
          </p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Year</li>
            <li>Outstanding balance on the double debt (francs)</li>
            <li>Annual payments toward the indemnity and related loan</li>
            <li>Breakdowns by indemnity, interest, and fees where available</li>
            <li>
              Conversions into 2021 U.S. dollars using consumer prices and
              exchange rates
            </li>
          </ul>
          <p className="text-sm text-slate-300">
            In this project, that CSV is ingested and transformed into a yearly
            series from 1804 to 1947. For years without quantitative data on
            the double debt (pre-1825 and post-1888), the series uses explicit
            zeros and labels those periods as outside the scope of the
            underlying dataset.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Key Historical Works</h2>
          <p className="text-sm text-slate-300">
            For narrative context and interpretation, this project relies on
            synthesized insights from historians and economists, including:
          </p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>
              The New York Times, &quot;The Ransom&quot; (2022), investigative
              series on Haiti&apos;s independence debt and its long-term
              effects.
            </li>
            <li>
              Studies of Haiti&apos;s 19th-century public debt and &quot;odious
              debt&quot; frameworks by economic historians.
            </li>
            <li>
              General histories of the Haitian Revolution and its aftermath that
              describe the 1825 ordinance and 1838 renegotiation of the
              indemnity.
            </li>
          </ul>
          <p className="text-xs text-slate-400">
            Pending: Exact citations will be expanded in the future you to list specific
            books and articles by author and year.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">Transformations & Assumptions</h2>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>
              The project focuses on the indemnity and 1825 loan (&quot;double
              debt&quot;). Other foreign debts Haiti carried, especially in the
              late 19th and early 20th centuries, are acknowledged but not
              quantified here.
            </li>
            <li>
              The year-by-year payment and balance figures follow the structure
              of the NYT dataset; the code does not attempt to reinterpret or
              re-estimate those amounts.
            </li>
            <li>
              Years before 1825 and after the double debt is paid use explicit
              placeholder values of zero for payments and outstanding balance.
              The UI and this page both flag those periods as outside the scope
              of the quantitative dataset.
            </li>
            <li>
              Currency conversions into 2021 U.S. dollars are taken directly
              from the dataset and are meant as order-of-magnitude indicators,
              not precise present-value measures.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold">How to Read This Visualization</h2>
          <p>
            The lines on the main chart show annual payments and the remaining
            balance on the double debt where the underlying data exists.
            Because Haiti&apos;s broader fiscal history is more complex than
            any single chart, users are encouraged to treat this as a doorway
            into the topic, not the final word. The source code and data
            transformation steps can be inspected to see exactly how the
            visualization is built.
          </p>
        </section>
      </article>
    </main>
  );
}
