import type { ViewerRenderContext } from '@hcxz/core'
import type { MaterialNode } from '@hcxz/schema'
import type { ChartBarProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { renderEChartsSvg } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { UNIT_FACTOR } from '@hcxz/shared'
import { resolveChartBarRuntimeData } from './data-contract'
import { createChartBarRuntimeOptionFromData } from './options'

export function renderChartBar(node: MaterialNode, context?: ViewerRenderContext) {
  const props = getNodeProps<ChartBarProps>(node)
  const resolvedData = resolveChartBarRuntimeData(node, props, context?.data ?? {})
  for (const diagnostic of resolvedData.diagnostics)
    context?.reportDiagnostic?.({ ...diagnostic, nodeId: node.id })

  const option = createChartBarRuntimeOptionFromData(props, resolvedData.data)
  const pxFactor = 96 / (UNIT_FACTOR[context?.unit ?? 'mm'] ?? 25.4)
  const svg = renderEChartsSvg(option, node.width * pxFactor, node.height * pxFactor)
  const backgroundStyle = props.backgroundColor ? `background:${props.backgroundColor};` : ''

  return {
    html: trustedViewerHtml(`<div style="width:100%;height:100%;overflow:hidden;${backgroundStyle}">${svg}</div>`),
  }
}
