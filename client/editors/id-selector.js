import { i18next } from '@things-factory/i18n-base'
import { isMobileDevice } from '@things-factory/shell'
import { css, html, LitElement } from 'lit-element'
import { MultiColumnFormStyles } from '@things-factory/form-ui'
import '@things-factory/grist-ui'

export class IdSelector extends LitElement {
  static get properties() {
    return {
      value: String,
      config: Object,
      data: Object,
      queryName: String,
      basicArgs: Object,
      confirmCallback: Object,
      selectedRecords: Array
    }
  }

  static get styles() {
    return [
      MultiColumnFormStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;

          background-color: #fff;
        }

        data-grist {
          flex: 1;
        }

        .button-container {
          display: flex;
          margin-left: auto;
        }

        form {
          position: relative;
        }

        [search] {
          position: absolute;
          right: 0;
        }
      `
    ]
  }

  get context() {
    return {
      title: i18next.t('title.confirm_arrival_notice')
    }
  }

  render() {
    return html`
      <form
        class="multi-column-form"
        id="search-form"
        @keypress=${async e => {
          if (e.keyCode === 13) {
            this.data = await this.getData()
          }
        }}
      >
        <fieldset>
          <label>${i18next.t('field.name')}</label>
          <input name="name" />

          <label>${i18next.t('field.description')}</label>
          <input name="description" />
        </fieldset>

        <mwc-icon
          search
          @click="${async () => {
            this.data = await this.getData()
          }}}"
          >search</mwc-icon
        >
      </form>

      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=${this.fetchHandler.bind(this)}
        .selectedRecords=${this.selectedRecords}
      ></data-grist>

      <div class="button-container">
        <mwc-button @click=${this.oncancel.bind(this)}>${i18next.t('button.cancel')}</mwc-button>
        <mwc-button @click=${this.onconfirm.bind(this)}>${i18next.t('button.confirm')}</mwc-button>
      </div>
    `
  }

  oncancel(e) {
    history.back()
  }

  onconfirm(e) {
    this.confirmCallback && this.confirmCallback(this.selected)
    history.back()
  }

  async firstUpdated() {
    this.config = {
      columns: [
        {
          type: 'gutter',
          gutterName: 'sequence'
        },
        {
          type: 'gutter',
          gutterName: 'row-selector',
          multiple: false
        },
        {
          type: 'string',
          name: 'id',
          header: i18next.t('field.id'),
          hidden: true
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          record: {
            align: 'left'
          },
          sortable: true,
          width: 160
        },
        {
          type: 'string',
          name: 'description',
          header: i18next.t('field.description'),
          record: {
            align: 'left'
          },
          sortable: true,
          width: 300
        }
      ],
      rows: {
        selectable: {
          multiple: false
        },
        handlers: {
          click: 'select-row'
        }
      },
      pagination: {
        infinite: true
      }
    }

    await this.updateComplete

    /* TODO config가 설정될 때, fetch() 가 동작하므로, fetch 완료 이벤트를 받아서, selected를 설정해주는 것이 좋겠다. 
       현재는 fetch() 가 두번 일어난다.
       */
    var grist = this.shadowRoot.querySelector('data-grist')
    await grist.fetch()

    var selected = grist.data.records.find(item => this.value == item.id)
    if (selected) {
      this.selectedRecords = [selected]
    }
    /* TODO config가 설정될 때, fetch() 가 동작하므로, fetch 완료 이벤트를 받아서, selected를 설정해주는 것이 좋겠다. */

    await this.updateComplete
    grist.focus()
  }

  async fetchHandler({ page, limit, sorters = [] }) {
    var total = 3401
    var start = (page - 1) * limit

    return {
      total,
      records: Array(limit * page > total ? total % limit : limit)
        .fill()
        .map((item, idx) => {
          return {
            id: start + idx,
            name: idx % 2 ? `HatioSEA` : `HatioLAB`,
            description: idx % 2 ? '말레이시아 세티아알람' : '경기도 성남시'
          }
        })
    }
  }

  _buildConditions() {
    const queryConditions = {
      filters: [],
      ...this.basicArgs
    }

    queryConditions.filters = [...queryConditions.filters, ...this.serializeFormData()]
    return queryConditions
  }

  serializeFormData() {
    const searchInputs = Array.from(this.shadowRoot.querySelectorAll('#search-form > input'))
    return searchInputs
      .filter(input => input.value)
      .map(input => {
        return { name: input.name, operator: 'like', value: input.value }
      })
  }

  get selected() {
    var grist = this.shadowRoot.querySelector('data-grist')

    var selected = grist.selected

    return selected && selected.length > 0 ? selected[0] : undefined
  }
}

customElements.define('id-selector', IdSelector)
