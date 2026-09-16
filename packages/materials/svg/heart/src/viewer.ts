import type { MaterialNode } from '@hcxz/schema'
import type { SvgHeartProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildSvgHeartMarkup } from './rendering'
import { SVG_HEART_DEFAULTS } from './schema'

export function renderSvgHeart(node: MaterialNode, _unit = 'mm') {
  const props = {
    ...SVG_HEART_DEFAULTS,
    ...getNodeProps<SvgHeartProps>(node),
  }
  return {
    html: trustedViewerHtml(buildSvgHeartMarkup(props, { width: node.width, height: node.height }), 'sanitized-rich-text'),
  }
}
