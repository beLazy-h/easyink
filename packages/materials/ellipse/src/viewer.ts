import type { MaterialNode } from '@hcxz/schema'
import type { EllipseProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { buildEllipseSvg } from './svg'

export function renderEllipse(node: MaterialNode, unit = 'mm') {
  const props = getNodeProps<EllipseProps>(node)
  return {
    html: trustedViewerHtml(buildEllipseSvg(props, unit)),
  }
}
