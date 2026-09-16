import type { AIMaterialDescriptor } from '@hcxz/shared'
import { createBuiltinDesignerMaterialBundle } from './designer'

const builtinDesignerMaterials = createBuiltinDesignerMaterialBundle('all').materials

export const builtinAIMaterialDescriptors: AIMaterialDescriptor[] = builtinDesignerMaterials.map(material => material.aiDescriptor).filter((descriptor): descriptor is AIMaterialDescriptor => !!descriptor)
