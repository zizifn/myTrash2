import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from '@tanstack/react-start'

type CfProperties = {
  city?: string
  country?: string
  colo?: string
  asn?: number
}

/**
 * Access log for the home page.
 *
 * Emits a structured JSON object so Cloudflare Workers Logs can index the
 * fields individually. Change the `pathname` check to log other routes, or
 * drop it entirely to log every page request.
 */
const accessLogMiddleware = createMiddleware().server(
  async ({ next, request, pathname, handlerType }) => {
    const startedAt = Date.now()
    const result = await next()

    // `router` means an SSR/page request; `serverFn` is a server function call.
    if (handlerType === 'router' && pathname === '/') {
      const cf = (request as Request & { cf?: CfProperties }).cf

      console.log({
        type: 'access',
        event: 'home_page_access',
        method: request.method,
        pathname,
        url: request.url,
        status: result.response.status,
        durationMs: Date.now() - startedAt,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        country: cf?.country,
        city: cf?.city,
        colo: cf?.colo,
        asn: cf?.asn,
        rayId: request.headers.get('cf-ray'),
        timestamp: new Date().toISOString(),
      })
    }

    return result
  },
)

// Defining a custom start file replaces Start's automatic CSRF middleware,
// so it must be added explicitly.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => ({
  requestMiddleware: [accessLogMiddleware, csrfMiddleware],
}))
