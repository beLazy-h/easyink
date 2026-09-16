import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { RatingProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildRatingHtml } from './rendering'

export function renderRating(node: MaterialNode, context?: ViewerRenderContext) {
  const props = {
    ...getNodeProps<RatingProps>(node),
    ...(context?.resolvedProps ?? {}),
  } as Partial<RatingProps>

  return {
    html: trustedViewerHtml(buildRatingHtml(node, props, { unit: context?.unit })),
  }
}
