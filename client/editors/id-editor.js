import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

import { openPopup } from '@things-factory/layout-base'
import './id-selector'

export class IdEditor extends LitElement {
  static get properties() {
    return {
      value: Object,
      column: Object,
      record: Object,
      row: Number
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        padding: 7px 0px;
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        border: 0;
        background-color: transparent;

        font: var(--grist-object-editor-font);
        color: var(--grist-object-editor-color);

        justify-content: inherit;
      }

      span {
        display: flex;
        flex: auto;

        justify-content: inherit;
      }

      mwc-icon {
        width: 20px;
        font-size: 1.5em;
        margin-left: auto;
      }
    `
  }

  render() {
    var { nameField = 'name', descriptionField = 'description' } = this.column.record.options || {}
    var value = this.value

    return html`
      ${!value
        ? html``
        : html`
            <span>${value[nameField]} (${value[descriptionField]})</span>
          `}
      <mwc-icon>arrow_drop_down</mwc-icon>
    `
  }

  async firstUpdated() {
    this.value = this.record[this.column.name]
    this.template = ((this.column.record || {}).options || {}).template

    await this.updateComplete

    this.shadowRoot.addEventListener('click', e => {
      e.stopPropagation()

      this.openSelector()
    })

    this.openSelector()
  }

  openSelector() {
    if (this.popup) {
      delete this.popup
    }

    const confirmCallback = selected => {
      var { idField = 'id', nameField = 'name', descriptionField = 'description' } = this.column.record.options || {}

      this.dispatchEvent(
        new CustomEvent('field-change', {
          bubbles: true,
          composed: true,
          detail: {
            before: this.value,
            after: {
              [idField]: selected[idField],
              [nameField]: selected[nameField],
              [descriptionField]: selected[descriptionField]
            },
            record: this.record,
            column: this.column,
            row: this.row
          }
        })
      )
    }

    var value = this.value || {}
    var template =
      this.template ||
      html`
        <id-selector
          .value=${value.id}
          .confirmCallback=${confirmCallback.bind(this)}
          .queryName=${this.column.record.options.queryName}
          .basicArgs=${this.column.record.options.basicArgs}
        ></id-selector>
      `

    this.popup = openPopup(template, {
      backdrop: true,
      size: 'large',
      title: 'select item'
    })
  }
}

customElements.define('id-editor', IdEditor)
