import type { MaterialDesignerExtension, MaterialExtensionContext } from '@hcxz/core'
import type { ChartBarProps } from './schema'
import { createChartDesignerRenderHost, mountECharts } from '@hcxz/material-chart-kernel'
import { getNodeProps } from '@hcxz/schema'
import { createChartBarPreviewOption } from './options'

export function createChartBarExtension(_context: MaterialExtensionContext): MaterialDesignerExtension {
  return {
    renderContent(nodeSignal, container) {
      container.replaceChildren()
      const { chartEl } = createChartDesignerRenderHost(container)

      const mount = mountECharts(chartEl, createChartBarPreviewOption(getNodeProps<ChartBarProps>(nodeSignal.get())))
      const unsubscribe = nodeSignal.subscribe((node) => {
        mount.update(createChartBarPreviewOption(getNodeProps<ChartBarProps>(node)))
      })

      return () => {
        unsubscribe()
        mount.dispose()
        container.replaceChildren()
      }
    },
  }
}
