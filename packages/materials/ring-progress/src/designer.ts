import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { RingProgressProps } from './schema'
import { getBindingRefs, getNodeProps } from '@hcxz/schema'
import { buildRingProgressHtml } from './rendering'

function buildDesignerHtml(node: MaterialNode, context: MaterialExtensionContext): string {
  const props = getNodeProps<RingProgressProps>(node)
  const binding = getBindingRefs(node.binding)[0]
  const textOverride = binding && props.showText
    ? `{#${context.getBindingLabel(binding)}}${props.suffix || ''}`
    : undefined
  return buildRingProgressHtml(node, props, { textOverride })
}

export function createRingProgressExtension(context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      function render() {
        container.innerHTML = buildDesignerHtml(nodeSignal.get(), context)
      }
      render()
      const unsub = nodeSignal.subscribe(render)
      return unsub
    },
  }
}
