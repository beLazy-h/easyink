import type { MaterialNode } from '@hcxz/schema'
import type { SvgStarProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildStarSvgMarkup } from './rendering'
import { SVG_STAR_DEFAULTS } from './schema'

export function renderSvgStar(node: MaterialNode) {
  const props = {
    ...SVG_STAR_DEFAULTS,
    ...getNodeProps<SvgStarProps>(node),
  }

  return {
    html: trustedViewerHtml(buildStarSvgMarkup(props, node.width, node.height), 'sanitized-rich-text'),
  }
}
