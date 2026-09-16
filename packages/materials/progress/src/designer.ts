import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { ProgressProps } from './schema'
import { getBindingRefs, getNodeProps } from '@hcxz/schema'
import { buildProgressHtml } from './rendering'

function buildDesignerHtml(node: MaterialNode, context: MaterialExtensionContext): string {
  const props = getNodeProps<ProgressProps>(node)
  const binding = getBindingRefs(node.binding)[0]
  const textOverride = binding && props.showText
    ? `{#${context.getBindingLabel(binding)}}${props.suffix || ''}`
    : undefined
  return buildProgressHtml(node, props, { textOverride, unit: context.getSchema().unit })
}

export function createProgressExtension(context: MaterialExtensionContext): MaterialDesignerExtension {
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
