import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { ChartRadarProps } from './schema'
import { createChartDesignerRenderHost, mountECharts } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { createChartRadarPreviewOption } from './options'

export function createChartRadarExtension(_context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      container.replaceChildren()
      const { chartEl } = createChartDesignerRenderHost(container)

      const mount = mountECharts(chartEl, createChartRadarPreviewOption(getNodeProps<ChartRadarProps>(nodeSignal.get())))
      const unsubscribe = nodeSignal.subscribe((node) => {
        mount.update(createChartRadarPreviewOption(getNodeProps<ChartRadarProps>(node)))
      })

      return () => {
        unsubscribe()
        mount.dispose()
        container.replaceChildren()
      }
    },
  }
}
