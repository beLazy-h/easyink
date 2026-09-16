import type { PropSchema } from '@hcxz/core'
import { STROKE_STYLE_OPTIONS } from '@hcxz/prop-schemas'

export const lineDesignerPropSchemas: PropSchema[] = [
  { key: 'lineColor', label: 'materials.line.property.lineColor', type: 'color', group: 'appearance' },
  { key: 'lineType', label: 'materials.line.property.lineType', type: 'enum', group: 'appearance', enum: STROKE_STYLE_OPTIONS },
]
