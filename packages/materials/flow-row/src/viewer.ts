import type { ViewerMeasureContext, ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import { trustedViewerHtml } from '@hcxz/core'
import { measureFlowRows, renderFlowRowsHtml, resolveFlowRows } from './rendering'

export function renderFlowRow(node: MaterialNode, context: ViewerRenderContext) {
  const model = resolveFlowRows(node, {
    data: context.data ?? {},
    nodeId: node.id,
    reportDiagnostic: context.reportDiagnostic,
  })
  return {
    html: trustedViewerHtml(renderFlowRowsHtml(node, model, context.unit ?? 'mm')),
  }
}

export function measureFlowRow(node: MaterialNode, context: ViewerMeasureContext) {
  const model = resolveFlowRows(node, {
    data: context.data ?? {},
    nodeId: node.id,
    reportDiagnostic: context.reportDiagnostic,
  })
  return {
    width: node.width,
    height: Math.max(node.height, measureFlowRows(node, model)),
  }
}
