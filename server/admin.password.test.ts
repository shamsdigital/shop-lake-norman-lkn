import { describe, expect, it } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

describe('admin.verifyPassword', () => {
  it('accepts the configured eight-digit password and rejects invalid credentials', async () => {
    const ctx = { user: null, req: { headers: {} } as TrpcContext['req'], res: { setHeader: () => undefined } as TrpcContext['res'] } satisfies TrpcContext;
    const caller = appRouter.createCaller(ctx);
    const configuredPassword = process.env.ADMIN_PASSWORD ?? '';
    expect(configuredPassword.length).toBeGreaterThanOrEqual(8);
    await expect(caller.admin.verifyPassword({ password: configuredPassword })).resolves.toEqual({ ok: true });
    const wrongPassword = `${configuredPassword}-no`;
    await expect(caller.admin.verifyPassword({ password: wrongPassword })).rejects.toThrow();
  });
});
