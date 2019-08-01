import { registerEditor, registerRenderer } from '@things-factory/grist-ui'

import { IdRenderer } from './renderers/id-renderer'
import { IdEditor } from './editors/id-editor'
import { BarcodeRenderer } from './renderers/barcode-renderer'
import { getEditor } from '@things-factory/grist-ui'

export default function bootstrap() {
  registerRenderer('id', IdRenderer)
  registerRenderer('barcode', BarcodeRenderer)
  registerEditor('id', IdEditor)
  registerEditor('barcode', getEditor('string'))
}
