import { createFileRoute } from '@tanstack/react-router'
import { WORKSPACE_MARKER, formatAppTitle } from '@mytrash2/shared'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>{formatAppTitle()}</h1>
      <p>TanStack Start is running. update22</p>
      <p>shared: {WORKSPACE_MARKER}</p>
    </main>
  )
}
