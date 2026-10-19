export default function DonationCard({
  name,
  email,
  phone,
  category,
  amount,
  reference,
  status,
  anonymous,
  onMarkPaid,
}) {
  const isPaid = status === "paid";

  return (
    <article className="group relative flex h-full flex-col gap-6 rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] transition-[filter] hover:drop-shadow-none md:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-magenta-500 to-[#6d0470] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[inset_0_0_22.1px_0_rgba(0,0,0,0.75)] transition-opacity group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-display text-[28px] leading-[1.2] text-magenta-100 md:text-[32px]">
            {name}
          </h2>
          {anonymous && (
            <span className="font-josefin text-[14px] font-semibold text-magenta-100/70">
              Asked to stay anonymous
            </span>
          )}
        </div>
        <span className="shrink-0 rounded-lg bg-pink-200 px-4 py-2 font-josefin text-[16px] font-semibold text-magenta-500">
          {category}
        </span>
      </div>

      <dl className="relative flex flex-col gap-3 font-josefin text-[18px] font-semibold">
        <Detail label="Amount">R{amount?.toLocaleString()}</Detail>
        <Detail label="Ref">{reference}</Detail>
        <Detail label="Email">{email}</Detail>
        <Detail label="Phone">{phone || "Not given"}</Detail>
      </dl>

      <div className="relative mt-auto">
        {isPaid ? (
          <span className="flex h-12 items-center justify-center rounded-lg bg-magenta-100/15 font-josefin text-[18px] font-semibold text-magenta-100">
            Paid
          </span>
        ) : (
          <button
            type="button"
            onClick={onMarkPaid}
            className="h-12 w-full rounded-lg bg-pink-base font-josefin text-[18px] font-semibold text-magenta-500 transition-colors hover:bg-pink-200"
          >
            Mark as Paid
          </button>
        )}
      </div>
    </article>
  );
}

function Detail({ label, children }) {
  return (
    <div className="flex gap-4">
      <dt className="w-20 shrink-0 text-magenta-100/70">{label}</dt>
      <dd className="min-w-0 break-all text-white">{children}</dd>
    </div>
  );
}
