export default function route(page) {
  switch (page) {
    case 'grid-test':
      import('./pages/grid-test')
      return page

    case 'list-test':
      import('./pages/list-test')
      return page

    case 'grist-test':
      import('./pages/grist-test')
      return page
  }
}
