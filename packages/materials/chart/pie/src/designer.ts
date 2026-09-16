import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { ChartPieProps } from './schema'
import { createChartDesignerRenderHost, mountECharts } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { createChartPiePreviewOption } from './options'

export function createChartPieExtension(_context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      container.replaceChildren()
      const { chartEl } = createChartDesignerRenderHost(container)

      const mount = mountECharts(chartEl, createChartPiePreviewOption(getNodeProps<ChartPieProps>(nodeSignal.get())))
      const unsubscribe = nodeSignal.subscribe((node) => {
        mount.update(createChartPiePreviewOption(getNodeProps<ChartPieProps>(node)))
      })

      return () => {
        unsubscribe()
        mount.dispose()
        container.replaceChildren()
      }
    },
  }
}
