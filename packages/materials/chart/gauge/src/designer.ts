import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { ChartGaugeProps } from './schema'
import { createChartDesignerRenderHost, mountECharts } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { createChartGaugePreviewOption } from './options'

export function createChartGaugeExtension(_context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      container.replaceChildren()
      const { chartEl } = createChartDesignerRenderHost(container)

      const mount = mountECharts(chartEl, createChartGaugePreviewOption(getNodeProps<ChartGaugeProps>(nodeSignal.get())))
      const unsubscribe = nodeSignal.subscribe((node) => {
        mount.update(createChartGaugePreviewOption(getNodeProps<ChartGaugeProps>(node)))
      })

      return () => {
        unsubscribe()
        mount.dispose()
        container.replaceChildren()
      }
    },
  }
}
