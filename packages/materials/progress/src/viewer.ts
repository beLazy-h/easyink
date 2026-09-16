import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { ProgressProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildProgressHtml } from './rendering'

export function renderProgress(node: MaterialNode, context?: ViewerRenderContext) {
  const props = getNodeProps<ProgressProps>(node)
  return {
    html: trustedViewerHtml(buildProgressHtml(node, props, { unit: context?.unit })),
  }
}
