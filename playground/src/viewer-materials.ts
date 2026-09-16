import type { ViewerRuntime } from '@hcxz/viewer'
import { registerBuiltinViewerMaterials } from '@hcxz/builtin/all'

export function setupPlaygroundViewerMaterials(viewer: ViewerRuntime): void {
  registerBuiltinViewerMaterials((type, binding, extension) => {
    viewer.registerMaterial(type, binding, extension)
  })
}
