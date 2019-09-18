import { html, css } from 'lit-element'

import { PageView, isMobileDevice, sleep } from '@things-factory/shell'
import { localize, i18next } from '@things-factory/i18n-base'

import '@things-factory/grist-ui'

class GristTest extends localize(i18next)(PageView) {
  static get styles() {
    return css`
      :host {
        display: block;

        width: 100%;
      }

      data-grist {
        width: 100%;
        height: 100%;
      }
    `
  }

  static get properties() {
    return {
      config: Object,
      data: Object
    }
  }

  get context() {
    return {
      title: 'Grist Test',
      printable: true
    }
  }

  get grist() {
    return this.shadowRoot.querySelector('data-grist')
  }

  render() {
    return html`
      <data-grist
        .mode=${isMobileDevice() ? 'LIST' : 'GRID'}
        .config=${this.config}
        .fetchHandler=${this.fetchHandler}
      ></data-grist>
    `
  }

  languageUpdated() {
    this.grist.refresh()
  }

  async fetchHandler({ page, limit, sorters = [] }) {
    var total = 120993
    var start = (page - 1) * limit

    return {
      total,
      records: Array(limit * page > total ? total % limit : limit)
        .fill()
        .map((item, idx) => {
          return {
            id: idx,
            name: idx % 2 ? `shnam-${start + idx + 1}` : `heartyoh-${start + idx + 1}`,
            description: idx % 2 ? `hatiolab manager-${start + idx + 1}` : `hatiosea manager-${start + idx + 1}`,
            email: idx % 2 ? `shnam-${start + idx + 1}@gmail.com` : `heartyoh-${start + idx + 1}@gmail.com`,
            active: Math.round(Math.random() * 2) % 2 ? true : false,
            barcode: idx % 2 ? `1234567890${start + idx + 1}` : `0987654321${start + idx + 1}`,
            company:
              idx % 2
                ? {
                    id: '2',
                    name: 'HatioLAB',
                    description: `경기도 성남시-${start + idx + 1}`
                  }
                : {
                    id: '3',
                    name: 'HatioSEA',
                    description: `말레이시아 세티아알람-${start + idx + 1}`
                  },
            role: ['admin', 'worker', 'tester'][idx % 3],
            color: idx % 2 ? `#87f018` : `#180f87`,
            rate: Math.round(Math.random() * 100),
            homepage:
              idx % 2 ? `http://hatiolab.com/${start + idx + 1}` : `http://deadpool.hatiolab.com/${start + idx + 1}`,
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        })
    }
  }

  async activated(active) {
    if (!active) {
      return
    }

    this.config = {
      columns: [
        {
          type: 'gutter',
          gutterName: 'dirty'
        },
        {
          type: 'gutter',
          gutterName: 'sequence'
        },
        {
          type: 'gutter',
          gutterName: 'row-selector',
          multiple: true
        },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: 'edit',
          handlers: {
            click: 'record-view'
          }
        },
        {
          type: 'string',
          name: 'id',
          hidden: true
        },
        {
          type: 'link',
          name: 'name',
          header: 'field.name',
          record: {
            align: 'center',
            editable: true,
            options: {
              // href: 'http://hatiolab.com',
              href: function(column, record, rowIndex) {
                return record['homepage']
              }
              // target: '_blank'
            }
          },
          sortable: true,
          width: 120
        },
        {
          type: 'string',
          name: 'description',
          header: 'field.description',
          record: {
            align: 'left'
          },
          width: 200,
          handlers: {
            dblclick: (columns, data, column, record, rowIndex) => {
              alert(`${column.name} ${record[column.name]}, row : ${rowIndex}`)
            }
          }
        },
        {
          type: 'string',
          name: 'email',
          header: 'field.email',
          record: {
            align: 'center',
            editable: true
          },
          sortable: true,
          width: 130
        },
        {
          type: 'barcode',
          name: 'barcode',
          header: 'field.barcode',
          record: {
            align: 'center',
            editable: true,
            options: {
              type: 'qrcode'
            }
          },
          sortable: false,
          width: 140
        },
        {
          type: 'id',
          name: 'company',
          header: 'field.company',
          record: {
            align: 'center',
            editable: true,
            options: {}
          },
          sortable: true,
          width: 240
        },
        {
          type: 'boolean',
          name: 'active',
          header: 'field.active',
          record: {
            align: 'center',
            editable: true
          },
          handlers: {
            dblclick: () => {
              console.log(this.grist.dirtyRecords)
            }
          },
          sortable: true,
          width: 60
        },
        {
          type: 'select',
          name: 'role',
          header: 'field.role',
          record: {
            align: 'center',
            options: ['admin', 'worker', 'tester'],
            editable: true
          },
          sortable: true,
          width: 120
        },
        {
          type: 'color',
          name: 'color',
          header: 'field.color',
          record: {
            align: 'center',
            editable: true
          },
          sortable: true,
          width: 50
        },
        {
          type: 'float',
          name: 'rate',
          header: 'field.rate',
          record: {
            align: 'right',
            editable: true
          },
          sortable: true,
          width: 50
        },
        {
          type: 'progress',
          name: 'rate',
          header: 'field.rate',
          record: {
            align: 'center',
            editor: 'float',
            editable: true
          },
          sortable: true,
          width: 50
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: 'field.updated_at',
          record: {
            align: 'center',
            editable: true
          },
          sortable: true,
          width: 180
        },
        {
          type: 'datetime',
          name: 'createdAt',
          header: 'field.created_at',
          record: {
            align: 'center',
            editable: true
          },
          sortable: true,
          width: 180
        }
      ],
      rows: {
        selectable: {
          multiple: true
        },
        handlers: {
          click: 'select-row-toggle'
        }
      },
      sorters: [
        {
          name: 'name',
          descending: true
        },
        {
          name: 'email'
        }
      ],
      pagination: {
        pages: [20, 30, 50, 100, 200]
      }
    }

    this.page = 1
    this.limit = 50

    await this.updateComplete

    this.grist.fetch()
  }
}

window.customElements.define('grist-test', GristTest)
