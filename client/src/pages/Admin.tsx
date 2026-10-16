import { FormEvent, useState } from 'react';
import { TRPCClientError } from '@trpc/client';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

function isApiUnavailable(error: unknown) {
  if (!(error instanceof TRPCClientError)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes('unexpected token') ||
    message.includes('not valid json') ||
    message.includes('failed to execute') ||
    message.includes('failed to fetch') ||
    message.includes('network')
  );
}

function StaticHostingNotice() {
  return (
    <main className="page-top mx-auto max-w-xl px-5 pb-16">
      <div className="eyebrow mb-4 text-[#0b3d91]">Admin / Server required</div>
      <h1 className="display text-4xl text-[#0b3d91] sm:text-5xl">Admin needs a backend.</h1>
      <p className="mt-4 text-sm leading-7 text-[#4a5c70]">
        This site is hosted on Render Static, which serves HTML and assets only. The admin tools
        talk to <code className="text-[#0b3d91]">/api/trpc</code> on a Node server — on static
        hosting that URL returns the home page instead of JSON, so login cannot work here.
      </p>
      <p className="mt-4 text-sm leading-7 text-[#4a5c70]">
        To use <strong>/admin</strong>, deploy a Render <strong>Web Service</strong> (not Static Site)
        with <code className="text-[#0b3d91]">pnpm install && pnpm build</code> and{' '}
        <code className="text-[#0b3d91]">pnpm start</code>, plus{' '}
        <code className="text-[#0b3d91]">ADMIN_PASSWORD</code> in environment variables.
      </p>
      <a href="/" className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91] underline underline-offset-4">
        Back to the member directory
      </a>
    </main>
  );
}

export default function Admin() {
  const session = trpc.admin.session.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const utils = trpc.useUtils();
  const verify = trpc.admin.verifyPassword.useMutation({ onSuccess: () => session.refetch() });
  const create = trpc.admin.createCard.useMutation({
    onSuccess: () => {
      utils.cards.list.invalidate();
      utils.admin.list.invalidate();
      setSaved(true);
      setForm({ category: '', businessName: '', businessUrl: '', imageDataUrl: '' });
    },
  });
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ category: '', businessName: '', businessUrl: '', imageDataUrl: '' });

  if (session.isLoading) {
    return (
      <main className="page-top mx-auto max-w-4xl px-5 pb-16">
        <div className="eyebrow text-[#0b3d91]">Admin / Loading</div>
      </main>
    );
  }

  if (session.isError && isApiUnavailable(session.error)) {
    return <StaticHostingNotice />;
  }

  if (!session.data?.ok) {
    return (
      <main className="page-top mx-auto max-w-xl px-5 pb-16">
        <div className="eyebrow mb-4 text-[#0b3d91]">Private index room</div>
        <h1 className="display text-5xl text-[#0b3d91]">Unlock the card desk.</h1>
        <p className="mt-4 text-sm leading-7 text-[#4a5c70]">
          Enter the admin password to add a new business card to the directory.
        </p>
        <form
          className="mt-8 flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            verify.mutate({ password });
          }}
        >
          <input
            aria-label="Admin password"
            type="password"
            minLength={8}
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-w-0 flex-1 border-b border-[#9aabc0] bg-transparent px-1 py-3 outline-none"
            placeholder="Password"
          />
          <Button type="submit">Unlock</Button>
        </form>
        {verify.error && (
          <p className="mt-4 text-sm text-red-700">
            {isApiUnavailable(verify.error)
              ? 'The admin server is not reachable from this deployment.'
              : 'The password was not accepted.'}
          </p>
        )}
      </main>
    );
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSaved(false);
    create.mutate({
      category: form.category,
      businessName: form.businessName,
      businessUrl: form.businessUrl,
      imageDataUrl: form.imageDataUrl,
    });
  };

  return (
    <main className="page-top mx-auto max-w-5xl px-5 pb-16 lg:px-10">
      <div className="eyebrow mb-4 text-[#0b3d91]">Private index room / Add a card</div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h1 className="display text-5xl text-[#0b3d91]">Add a new listing.</h1>
        <a className="text-xs uppercase tracking-[.13em] text-[#0b3d91] underline underline-offset-4" href="/">
          View public directory
        </a>
      </div>
      <form onSubmit={submit} className="mt-10 grid gap-6 border-y border-[#cdd7e4] py-8 md:grid-cols-2">
        <label className="text-sm text-[#4a5c70]">
          Business name
          <input
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            className="mt-2 w-full border-b border-[#9aabc0] bg-transparent py-3 text-[#0b3d91] outline-none"
          />
        </label>
        <label className="text-sm text-[#4a5c70]">
          Category
          <input
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-2 w-full border-b border-[#9aabc0] bg-transparent py-3 text-[#0b3d91] outline-none"
          />
        </label>
        <label className="text-sm text-[#4a5c70]">
          Website URL
          <input
            type="url"
            value={form.businessUrl}
            onChange={(e) => setForm({ ...form, businessUrl: e.target.value })}
            className="mt-2 w-full border-b border-[#9aabc0] bg-transparent py-3 text-[#0b3d91] outline-none"
            placeholder="https://"
          />
        </label>
        <label className="text-sm text-[#4a5c70]">
          Business card image
          <input
            required
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setForm({ ...form, imageDataUrl: String(reader.result) });
              reader.readAsDataURL(file);
            }}
            className="mt-3 block w-full text-xs"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4 md:col-span-2">
          <Button type="submit" disabled={create.isPending || !form.imageDataUrl}>
            {create.isPending ? 'Saving…' : 'Save card'}
          </Button>
          {saved && <span className="text-sm text-[#0b3d91]">Card added to the directory.</span>}
          {create.error && <span className="text-sm text-red-700">{create.error.message}</span>}
        </div>
      </form>
      <p className="mt-6 max-w-2xl text-xs leading-6 text-[#7a8b9c]">
        Uploaded images are stored through the project’s managed file storage and referenced by the card record,
        while the original 283-card catalog remains bundled in the repository.
      </p>
    </main>
  );
}
