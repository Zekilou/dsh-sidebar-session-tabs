/**
 * A `filterOnly` source: it contributes no rows of its own. It exists so the
 * session list grows one tab that keeps only the native sessions whose id
 * carries this machine's prefix, which is how a plugin that merges another
 * machine's sessions into the local list gets a "this machine only" filter
 * without duplicating them.
 *
 * Change PREFIX to whatever your merge writes into the session id.
 */
window.__ModuleLoader__.load({
  id: '@example/dsh-native-filter-source',
  factory(require) {
    const PREFIX = 'remote:example/'

    return {
      inject: ['sidebarSessionSources'],
      apply(ctx) {
        const dispose = ctx.sidebarSessionSources.register({
          id: 'example-remote',
          label: 'Example machine',
          accent: '#a97cf0',
          filterOnly: true,
          ownsNativeSession: (sessionId) => sessionId.startsWith(PREFIX),
          getSnapshot: () => ({ groups: [], sessions: [] }),
        })
        ctx.effect(() => () => dispose(), 'example-native-filter: cleanup')
      },
    }
  },
})
