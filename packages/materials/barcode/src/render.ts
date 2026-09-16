import JsBarcode from 'jsbarcode'
import { DOMImplementation, XMLSerializer } from 'xmldom'

export interface BarcodeSvgOptions {
  format?: string
  lineWidth?: number
  lineColor?: string
  backgroundColor?: string
  showText?: boolean
  margin?: number
  lineHeight?: number
  fontSize?: number
}

function escapeSvgAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Generate a real barcode as an inline SVG string.
 * Uses JsBarcode internal encoders to get the binary bar pattern,
 * then renders it as SVG rects.
 */
export function generateBarcodeSvg(value: string, options: Partial<BarcodeSvgOptions> & { format: string }): string {
  const lineWidth = options.lineWidth || 2
  const lineColor = escapeSvgAttr(options.lineColor || '#000000')
  const backgroundColor = escapeSvgAttr(options.backgroundColor || '#ffffff')
  const showText = options.showText ?? true
  const margin = options.margin || 4
  const lineHeight = options.lineHeight || 60
  const fontSize = options.fontSize || 14

  const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null)
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  JsBarcode(svgNode, value, {
    ...options,
    xmlDocument: document,
    background: backgroundColor,
    width: lineWidth,
    height: lineHeight,
    margin,
    lineColor,
    fontSize,
    displayValue: showText,
  })
  svgNode.setAttribute('width', '100%')
  svgNode.setAttribute('height', '100%')
  const svgText = new XMLSerializer().serializeToString(svgNode)
  return svgText
}

export function generateBarcodeEmptySvg(options: Partial<Pick<BarcodeSvgOptions, 'lineColor' | 'backgroundColor'>>): string {
  const lineColor = escapeSvgAttr(options.lineColor || '#000000')
  const backgroundColor = escapeSvgAttr(options.backgroundColor || '#ffffff')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 48" width="100%" height="100%" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid meet" style="display:block" aria-hidden="true"><rect width="120" height="48" fill="${backgroundColor}"/><g fill="${lineColor}" opacity="0.18"><rect x="8" y="8" width="2" height="32"/><rect x="13" y="8" width="1" height="32"/><rect x="18" y="8" width="4" height="32"/><rect x="27" y="8" width="2" height="32"/><rect x="33" y="8" width="1" height="32"/><rect x="38" y="8" width="3" height="32"/><rect x="47" y="8" width="2" height="32"/><rect x="53" y="8" width="4" height="32"/><rect x="62" y="8" width="1" height="32"/><rect x="67" y="8" width="3" height="32"/><rect x="75" y="8" width="2" height="32"/><rect x="82" y="8" width="1" height="32"/><rect x="88" y="8" width="4" height="32"/><rect x="97" y="8" width="2" height="32"/><rect x="103" y="8" width="3" height="32"/><rect x="112" y="8" width="1" height="32"/></g></svg>`
}
