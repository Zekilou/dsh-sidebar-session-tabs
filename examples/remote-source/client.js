/**
 * Minimal external source. Everything this file does is the contract:
 * register one source, hand back snapshots, open your own rows.
 */
window.__ModuleLoader__.load({
  id: '@example/dsh-remote-sessions',
  factory(require) {
    /** Rows as a real plugin would receive them from its Host half. */
    let sessions = [
      { id: 'remote-1', title: 'Remote session one', updatedAt: Date.now() - 60_000, group: 'box', running: true },
      { id: 'remote-2', title: 'Remote session two', updatedAt: Date.now() - 3_600_000, group: 'box' },
    ]

    return {
      // `sidebarSessionSources` is provided by dsh-sidebar-session-tabs.
      inject: ['sidebarSessionSources'],
      apply(ctx) {
        const listeners = new Set()
        const notify = () => {
          for (const listener of listeners) listener()
        }

        const dispose = ctx.sidebarSessionSources.register({
          id: 'example-box',
          label: 'Example box',
          accent: '#37b5a4',
          getSnapshot: () => ({ groups: [{ id: 'box', label: 'Example box' }], sessions }),
          subscribe: (listener) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
          },
          open: (session) => {
            // The source owns navigation: here it just reports the target.
            console.log('[example-remote-sessions] open', session.id)
          },
        })

        // Replace the rows once, the way a poll would, to prove the list follows.
        const timer = setTimeout(() => {
          sessions = [...sessions, { id: 'remote-3', title: 'Arrived later', updatedAt: Date.now(), group: 'box' }]
          notify()
        }, 5000)

        ctx.effect(() => () => {
          clearTimeout(timer)
          dispose()
        }, 'example-remote-sessions: cleanup')
      },
    }
  },
})
