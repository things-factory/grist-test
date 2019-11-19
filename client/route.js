export default function route(page) {
  switch (page) {
    case 'grist-test':
      import('./pages/grist-test')
      return page

    case 'report-test':
      import('./pages/report-test')
      return page
  }
}
