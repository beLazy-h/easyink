import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { ChartGaugeProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { renderEChartsSvg } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { UNIT_FACTOR } from '@hcxz/shared'
import { resolveChartGaugeRuntimeData } from './data-contract'
import { createChartGaugeRuntimeOptionFromData } from './options'

export function renderChartGauge(node: MaterialNode, context?: ViewerRenderContext) {
  const props = getNodeProps<ChartGaugeProps>(node)
  const resolvedData = resolveChartGaugeRuntimeData(node, props, context?.data ?? {})
  for (const diagnostic of resolvedData.diagnostics)
    context?.reportDiagnostic?.({ ...diagnostic, nodeId: node.id })

  const option = createChartGaugeRuntimeOptionFromData(props, resolvedData.data)
  const pxFactor = 96 / (UNIT_FACTOR[context?.unit ?? 'mm'] ?? 25.4)
  const svg = renderEChartsSvg(option, node.width * pxFactor, node.height * pxFactor)
  const backgroundStyle = props.backgroundColor ? `background:${props.backgroundColor};` : ''

  return {
    html: trustedViewerHtml(`<div style="width:100%;height:100%;overflow:hidden;${backgroundStyle}">${svg}</div>`),
  }
}
