import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { RingProgressProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildRingProgressHtml } from './rendering'

export function renderRingProgress(node: MaterialNode, _context?: ViewerRenderContext) {
  const props = getNodeProps<RingProgressProps>(node)
  return {
    html: trustedViewerHtml(buildRingProgressHtml(node, props)),
  }
}
