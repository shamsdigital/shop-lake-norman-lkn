import { useEffect } from 'react';
import { Link } from 'wouter';

const adminUrl = import.meta.env.VITE_ADMIN_URL as string | undefined;

export default function AdminRedirect() {
  useEffect(() => {
    if (adminUrl) window.location.replace(adminUrl);
  }, []);

  if (!adminUrl) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24">
        <div className="eyebrow mb-4 text-[#0b3d91]">Admin</div>
        <h1 className="display text-4xl text-[#0b3d91] sm:text-5xl">Admin is hosted separately.</h1>
        <p className="mt-4 text-sm leading-7 text-[#4a5c70]">
          Set <code className="text-[#0b3d91]">VITE_ADMIN_URL</code> on the static site build to the Web Service
          admin URL (for example <code className="text-[#0b3d91]">https://your-api.onrender.com/admin</code>).
        </p>
        <Link href="/" className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91] underline underline-offset-4">
          Back to the member directory
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-24">
      <div className="eyebrow mb-4 text-[#0b3d91]">Admin</div>
      <h1 className="display text-4xl text-[#0b3d91] sm:text-5xl">Opening admin…</h1>
      <p className="mt-4 text-sm leading-7 text-[#4a5c70]">You&apos;ll be redirected to the admin portal in a moment.</p>
      <a
        href={adminUrl}
        className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[.13em] text-[#0b3d91] underline underline-offset-4"
      >
        Continue to admin
      </a>
    </main>
  );
}
