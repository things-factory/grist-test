import { html } from 'lit-html'

export const IdRenderer = (value, column, record) => {
  if (!value) {
    return ''
  }

  var { nameField = 'name', descriptionField = 'description' } = column.record.options || {}

  return html`
    ${value[nameField] || ''}(${value[descriptionField] || ''})
  `
}
