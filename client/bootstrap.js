import { html } from 'lit-html'
import { store, navigate } from '@things-factory/shell'
import { registerEditor, registerRenderer, getEditor } from '@things-factory/grist-ui'

import { IdRenderer } from './renderers/id-renderer'
import { IdEditor } from './editors/id-editor'
import { BarcodeRenderer } from './renderers/barcode-renderer'
import { ADD_MORENDA } from '@things-factory/more-base'

export default function bootstrap() {
  registerRenderer('id', IdRenderer)
  registerRenderer('barcode', BarcodeRenderer)
  registerEditor('id', IdEditor)
  registerEditor('barcode', getEditor('string'))

  /* add data-grist test morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html`
        <mwc-icon>list</mwc-icon>
      `,
      name: 'grist test',
      action: () => {
        navigate('grist-test')
      }
    }
  })

  /* add data-report test morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html`
        <mwc-icon>list</mwc-icon>
      `,
      name: 'report test',
      action: () => {
        navigate('report-test')
      }
    }
  })
}
