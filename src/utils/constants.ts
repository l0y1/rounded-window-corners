// This files use for store const variants will used by other modules.

import { _ } from '@me/utils/i18n'

/**
 * Loaded Message will be shown when debug.
 * see: https://patorjk.com/software/taag
 */
const LOADED_MSG = `
╦═╗┌─┐┬ ┬┌┐┌┌┬┐┌─┐┌┬┐╔═╗┌─┐┬─┐┌┬┐┌─┐┬─┐┌─┐╔═╗┌─┐┌─┐┌─┐┌─┐┌┬┐┌─┐
╠╦╝│ ││ ││││ ││├┤  ││║  │ │├┬┘ ││├┤ ├┬┘└─┐║╣ ├┤ ├┤ ├┤ │   │ └─┐
╩╚═└─┘└─┘┘└┘─┴┘└─┘─┴┘╚═╝└─┘┴└──┴┘└─┘┴└─└─┘╚═╝└  └  └─┘└─┘ ┴ └─┘

[RoundedCordersEffect] Loaded.`

export const constants = {
  /** Message to shown when extensions loaded successfully  */
  LOADED_MSG,
  /** Name of shadow actors */
  SHADOW_ACTOR_NAME: 'Rounded Window Shadow Actor',
  /** Name of rounded corners effects */
  ROUNDED_CORNERS_EFFECT: 'Rounded Corners Effect',
  /** Name of clip shadow effects  */
  CLIP_SHADOW_EFFECT: 'Clip Shadow Effect',
  /** Name of blur effect for window */
  BLUR_EFFECT: 'Patched Blur Effect',
  /** Padding of shadow actors */
  SHADOW_PADDING: 80,
  /** Tips when add new items in preferences Page */
  TIPS_EMPTY: () => _ ('Expand this row to pick a window.'),
  /** Used to mark widget in preferences/page/custom.ts */
  DON_T_CONFIG: 'Don\'t Configuration in Custom Page',
  /** Item label for background menu  */
  ITEM_LABEL: () => _ ('Rounded Corners Settings...'),
  /** Name of shadow actor to be added in overview */
  OVERVIEW_SHADOW_ACTOR: 'Shadow Actor (Overview)',
}
