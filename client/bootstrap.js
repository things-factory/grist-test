import { registerEditor, registerRenderer } from '@things-factory/grist-ui'

import { IdRenderer } from './renderers/id-renderer'
import { IdEditor } from './editors/id-editor'
import { BarcodeRenderer } from './renderers/barcode-renderer'
import { i18next } from '@things-factory/i18n-base'
import { DataGrist, getEditor } from '@things-factory/grist-ui'

export default function bootstrap() {
  /* global setting for DataGrist */
  DataGrist.translator = x => i18next.t(x)

  registerRenderer('id', IdRenderer)
  registerRenderer('barcode', BarcodeRenderer)
  registerEditor('id', IdEditor)
  registerEditor('barcode', getEditor('string'))
}
