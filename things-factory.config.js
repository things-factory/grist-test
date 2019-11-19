import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  bootstrap,
  route,
  routes: [
    {
      tagname: 'grist-test',
      page: 'grist-test'
    },
    {
      tagname: 'report-test',
      page: 'report-test'
    }
  ]
}
