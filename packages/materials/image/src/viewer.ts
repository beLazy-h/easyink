import type { MaterialNode } from '@hcxz/schema'
import type { ImageProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { escapeAttr } from '@hcxz/shared'

export function renderImage(node: MaterialNode, unit = 'mm') {
  const props = getNodeProps<ImageProps>(node)
  const borderStyle = props.borderWidth
    ? `border:${props.borderWidth}${unit} ${props.borderType || 'solid'} ${props.borderColor};`
    : ''
  const bgStyle = props.backgroundColor ? `background:${props.backgroundColor};` : ''

  if (!props.src) {
    return {
      html: trustedViewerHtml(`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;${bgStyle || 'background:#f5f5f5;'}color:#999;font-size:12px;box-sizing:border-box;${borderStyle}">[Image]</div>`),
    }
  }

  return {
    html: trustedViewerHtml(`<div style="width:100%;height:100%;box-sizing:border-box;${borderStyle}${bgStyle}">`
      + `<img src="${escapeAttr(props.src)}" alt="${escapeAttr(props.alt || '')}" style="width:100%;height:100%;object-fit:${props.fit};display:block;" /></div>`,
    ),
  }
}
