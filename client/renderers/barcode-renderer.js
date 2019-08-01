import { html } from 'lit-html'
import bwipjs from 'bwip-js'

export const BarcodeRenderer = (column, record, rowIndex) => {
  var value = record[column.name]

  if (!value) {
    return ''
  }

  var { type: bcid = 'code128' } = column.record.options || {}

  let canvas = document.createElement('canvas')
  canvas.setAttribute('center', true)

  bwipjs(
    canvas,
    {
      bcid,
      text: value,
      scale: 3,
      height: 10,
      width: 10,
      includetext: false,
      textalign: 'center'
    },
    function(err, cvs) {
      if (err) {
        // handle the error
      } else {
        // Don't need the second param since we have the canvas in scope...
        document.getElementById(myimg).src = canvas.toDataURL('image/png')
      }
    }
  )

  return html`
    ${canvas}
  `
}
