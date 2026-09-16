import type { MaterialNode } from '@hcxz/schema'
import type { SvgCustomProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildSvgCustomMarkup } from './rendering'

export function renderSvgCustom(node: MaterialNode) {
  const props = getNodeProps<SvgCustomProps>(node)

  return {
    html: trustedViewerHtml(buildSvgCustomMarkup(props), 'sanitized-rich-text'),
  }
}
