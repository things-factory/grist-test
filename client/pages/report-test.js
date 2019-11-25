import { html, css } from 'lit-element'

import { PageView } from '@things-factory/shell'
import { localize, i18next } from '@things-factory/i18n-base'

class ReportTest extends localize(i18next)(PageView) {
  static get styles() {
    return css`
      :host {
        display: block;

        width: 100%;
      }

      data-report {
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
      title: 'Report Test',
      printable: true
    }
  }

  get report() {
    return this.shadowRoot.querySelector('data-report')
  }

  render() {
    return html`
      <data-report .config=${this.config} .fetchHandler=${this.fetchHandler}></data-report>
    `
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
            email: idx % 2 ? `shnam@gmail.com` : `heartyoh@gmail.com`,
            active: Math.round(Math.random() * 2) % 2 ? true : false,
            company: idx % 5 ? 'HatioLAB' : 'HatioSEA',
            role: ['admin', 'worker', 'tester'][idx % 3],
            color: idx % 2 ? `#87f018` : `#180f87`,
            height: Math.round(Math.random() * 100),
            weight: Math.round(Math.random() * 100),
            homepage:
              idx % 2 ? `http://hatiolab.com/${start + idx + 1}` : `http://deadpool.hatiolab.com/${start + idx + 1}`,
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        })
    }
  }

  get reportConfig() {
    return {
      columns: [
        {
          type: 'string',
          name: 'company',
          header: i18next.t('field.company'),
          record: {
            align: 'center',
            options: {}
          },
          sortable: true,
          width: 240
        },
        {
          type: 'email',
          name: 'email',
          header: i18next.t('field.email'),
          record: {
            align: 'center'
          },
          sortable: true,
          width: 130
        },
        {
          type: 'string',
          name: 'id',
          hidden: true
        },
        {
          type: 'link',
          name: 'name',
          header: i18next.t('field.name'),
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
          header: i18next.t('field.description'),
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
          type: 'boolean',
          name: 'active',
          header: i18next.t('field.active'),
          record: {
            align: 'center'
          },
          handlers: {
            dblclick: () => {
              console.log(this.report.dirtyRecords)
            }
          },
          sortable: true,
          width: 60
        },
        {
          type: 'string',
          name: 'role',
          header: i18next.t('field.role'),
          record: {
            align: 'center'
          },
          sortable: true,
          width: 120
        },
        {
          type: 'number',
          name: 'weight',
          header: i18next.t('field.weight'),
          record: {},
          sortable: true,
          width: 50
        },
        {
          type: 'number',
          name: 'height',
          header: i18next.t('field.height'),
          record: {},
          sortable: true,
          width: 50
        },
        {
          type: 'datetime',
          name: 'updatedAt',
          header: i18next.t('field.updated_at'),
          record: {
            align: 'center'
          },
          sortable: true,
          width: 180
        },
        {
          type: 'datetime',
          name: 'createdAt',
          header: i18next.t('field.created_at'),
          record: {
            align: 'center'
          },
          sortable: true,
          width: 180
        }
      ],
      rows: {
        groups: ['company', 'email'],
        totals: ['weight', 'height']
      },
      sorters: [
        {
          name: 'name',
          descending: true
        },
        {
          name: 'email'
        }
      ]
    }
  }

  pageUpdated(changes, lifecycle) {
    if (this.active) {
      this.report.fetch()
    }
  }

  pageInitialized() {
    this.config = this.reportConfig

    this.page = 1
    this.limit = 50
  }
}

window.customElements.define('report-test', ReportTest)
