import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { ChartLineProps } from './schema'
import { createChartDesignerRenderHost, mountECharts } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { createChartLinePreviewOption } from './options'

export function createChartLineExtension(_context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      container.replaceChildren()
      const { chartEl } = createChartDesignerRenderHost(container)

      const mount = mountECharts(chartEl, createChartLinePreviewOption(getNodeProps<ChartLineProps>(nodeSignal.get())))
      const unsubscribe = nodeSignal.subscribe((node) => {
        mount.update(createChartLinePreviewOption(getNodeProps<ChartLineProps>(node)))
      })

      return () => {
        unsubscribe()
        mount.dispose()
        container.replaceChildren()
      }
    },
  }
}
