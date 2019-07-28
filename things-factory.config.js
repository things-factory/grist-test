import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  bootstrap,
  route,
  routes: [
    {
      tagname: 'grid-test',
      page: 'grid-test'
    },
    {
      tagname: 'list-test',
      page: 'list-test'
    },
    {
      tagname: 'grist-test',
      page: 'grist-test'
    }
  ]
}
