import { useEffect, useState } from "react";
import { api } from "../../api";

const YOCO_LINK = "https://pay.yoco.com/paws-and-purrs-rescue-npc";
const emptyForm = { categoryId: "", amount: "", anonymous: false };

export default function DonorDonate() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api("/categories").then(setCategories).catch((err) => setError(err.message));
  }, []);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/donations", {
        method: "POST",
        body: { ...form, amount: Number(form.amount) },
      });
      setDonation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(donation.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // lowkey cant do anything about that
    }
  }

  function startOver() {
    setDonation(null);
    setForm(emptyForm);
    setCopied(false);
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10">
      <div className="flex flex-col gap-6 md:gap-8">
        <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
          Donate
        </h1>
        <p className="max-w-[760px] select-none font-josefin text-[20px] font-medium leading-[120%] [text-box:trim-both_cap_alphabetic] md:text-[26px]">
          Choose what you'd like to support. We'll give you a reference code to use when you pay.
        </p>
      </div>

      <div className="w-full max-w-[640px] rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] md:p-8">
        {donation ? (
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-[32px] leading-[1.2] text-magenta-100 md:text-[40px]">
              Thank you!
            </h2>
            <p className="font-josefin text-[18px] font-semibold leading-[1.3] text-magenta-100 md:text-[20px]">
              Your R{donation.amount.toLocaleString()} donation to <span className="text-pink-base">{donation.categoryName}</span> is ready.
              Use this reference when you pay, so we know where it goes:
            </p>

            <div className="flex flex-col gap-3 rounded-lg bg-magenta-100/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-display text-[36px] tracking-wide text-magenta-100 md:text-[44px]">
                {donation.reference}
              </span>
              <button
                type="button"
                onClick={copyReference}
                className="h-12 shrink-0 rounded-lg bg-pink-base px-6 font-josefin text-[18px] font-semibold text-magenta-500 transition-colors hover:bg-pink-200"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <ol className="flex list-decimal flex-col gap-2 pl-6 font-josefin text-[18px] font-semibold text-magenta-100/90">
              <li>Click Pay with Yoco below.</li>
              <li>Enter R{donation.amount.toLocaleString()} as the amount.</li>
              <li>Paste <span className="text-pink-base">{donation.reference}</span> as the payment reference.</li>
            </ol>

            <a
              href={YOCO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] md:h-16 md:text-[22px]"
            >
              Pay with Yoco
            </a>

            <button
              type="button"
              onClick={startOver}
              className="font-josefin text-[18px] font-semibold text-pink-base hover:text-magenta-100"
            >
              Make another donation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="font-josefin text-[16px] font-semibold text-magenta-100">Donate towards</span>
              <select
                value={form.categoryId}
                onChange={(e) => updateField("categoryId", e.target.value)}
                required
                title=""
                className="h-12 cursor-pointer rounded-lg border border-magenta-100/30 bg-magenta-100/10 px-4 font-josefin text-[18px] text-white outline-none focus:border-pink-base"
              >
                <option value="" disabled className="bg-magenta-500">
                  Choose a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-magenta-500">
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-josefin text-[16px] font-semibold text-magenta-100">Amount (R)</span>
              <input
                type="number"
                min="1"
                step="1"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
                placeholder="e.g. 200"
                required
                title=""
                className="h-12 rounded-lg border border-magenta-100/30 bg-magenta-100/10 px-4 font-josefin text-[18px] text-white outline-none placeholder:text-magenta-100/50 focus:border-pink-base"
              />
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.anonymous}
                onChange={(e) => updateField("anonymous", e.target.checked)}
                className="mt-1 size-5 shrink-0 cursor-pointer accent-pink-base"
              />
              <span className="font-josefin text-[18px] font-semibold text-magenta-100">
                Donate anonymously
                <span className="block text-[15px] font-medium text-magenta-100/70">
                  Your name won't be shown publicly. The shelter can still see your details.
                </span>
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[16px] font-semibold text-pink-base">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] disabled:opacity-60 md:h-16 md:text-[22px]"
            >
              {loading ? "Please wait..." : "Get My Reference"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}