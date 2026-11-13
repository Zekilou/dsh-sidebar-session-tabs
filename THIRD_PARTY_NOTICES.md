# Third-party notices

This project is MIT-licensed (see [LICENSE](LICENSE)). Part of it is a fork of MIT-licensed
code from the DeepSeek Harness repository.

## @deepseek-ai/dsh-client-ui-workspace (fork)

- License: MIT, Copyright (c) DeepSeek
- Source: `packages/client/ui-workspace/` in
  <https://github.com/deepseek-ai/deepseek-harness>
- Version forked: 0.2.1-rc.5 (the Client bundle shipped in `lib/client.js`)

What the fork keeps from upstream, unchanged in behaviour: the workspace/session browsing
region and its section header, search, grouped/flat/tree list derivation, drag reordering,
session watermarks, animation, hover cards, the session row menus and hover actions
(pin, rename, fork, archive, copy id), the workspace dialogs, notices, keyboard shortcuts,
the directory flow, the blank-session workspace picker, and the `uiWorkspace` Client service.
Those portions carry upstream's structure and CSS declarations verbatim; class names are
unchanged because the styles travel with the same bundle.

What this project adds: the `local/session-filter-tabs` region in `client.js` (filter tab
strip, tag store backed by `localStorage`, tag dialog, row tag dots, hover-card tag line), and
the browser integration points that narrow the derivation when a filter tab is active.

Because the fork replaces the shipped browsing region, the bundle ships a patch that disables
the `ui-workspace` row so the two registrations cannot coexist. Uninstalling or disabling this
plugin removes that patch and restores the shipped region.

## Modules provided by the Harness, not by this package

`client.js` is a prebuilt Client bundle that receives its imports from the Harness page's
module table, exactly like the upstream bundle it was forked from:

- `react`, `react/jsx-runtime`
- `@deepseek-ai/cordis`
- `@deepseek-ai/dsh-client-store`
- `@deepseek-ai/dsh-client-ui-primitives`

None of these are bundled or vendored here; there is no `node_modules` in this package and no
install-time build.