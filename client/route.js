export default function route(page) {
  switch (page) {
    case 'grist-test':
      import('./pages/grist-test')
      return page
  }
}
