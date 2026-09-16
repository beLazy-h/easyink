import type { MaterialNode } from '@hcxz/schema'
import type { QrcodeProps } from './schema'
import { trustedViewerHtml } from '@hcxz/core'
import { getNodeProps } from '@hcxz/schema'
import { generateQrcodeEmptySvg, generateQrcodeSvg } from './render'

export function renderQrcode(node: MaterialNode) {
  const props = getNodeProps<QrcodeProps>(node)
  const value = props.value == null ? '' : String(props.value)

  if (!value) {
    return {
      html: trustedViewerHtml(generateQrcodeEmptySvg({
        foreground: props.foreground,
        background: props.background,
      })),
    }
  }

  return {
    html: trustedViewerHtml(generateQrcodeSvg(value, {
      errorCorrectionLevel: props.errorCorrectionLevel,
      foreground: props.foreground,
      background: props.background,
    })),
  }
}
