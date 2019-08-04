import { html } from 'lit-html'
import '@things-factory/barcode-ui'

export const BarcodeRenderer = (value, column, record) => {
  var { bcid = 'qrcode', scale = 3, height = 10, width = 10 } = column.record.options || {}

  return html`
    <barcode-tag
      .bcid=${bcid}
      .bcWidth=${width}
      .bcheight=${height}
      .bcScale=${scale}
      .value=${value}
      center
    ></barcode-tag>
  `
}
