import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { ChartScatterProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { renderEChartsSvg } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { UNIT_FACTOR } from '@hcxz/shared'
import { resolveChartScatterRuntimeData } from './data-contract'
import { createChartScatterRuntimeOptionFromData } from './options'

export function renderChartScatter(node: MaterialNode, context?: ViewerRenderContext) {
  const props = getNodeProps<ChartScatterProps>(node)
  const resolvedData = resolveChartScatterRuntimeData(node, props, context?.data ?? {})
  for (const diagnostic of resolvedData.diagnostics)
    context?.reportDiagnostic?.({ ...diagnostic, nodeId: node.id })

  const option = createChartScatterRuntimeOptionFromData(props, resolvedData.data)
  const pxFactor = 96 / (UNIT_FACTOR[context?.unit ?? 'mm'] ?? 25.4)
  const svg = renderEChartsSvg(option, node.width * pxFactor, node.height * pxFactor)
  const backgroundStyle = props.backgroundColor ? `background:${props.backgroundColor};` : ''

  return {
    html: trustedViewerHtml(`<div style="width:100%;height:100%;overflow:hidden;${backgroundStyle}">${svg}</div>`),
  }
}
