import type { MaterialNode } from '@hcxz/schema'
import { trustedViewerHtml } from '@hcxz/core'
import { buildSignatureSvg } from './rendering'
import { getSignatureProps } from './schema'

export function renderSignature(node: MaterialNode) {
  return {
    html: trustedViewerHtml(buildSignatureSvg(getSignatureProps(node), node.width, node.height)),
  }
}
