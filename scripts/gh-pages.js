import Pages from 'gh-pages'

Pages.publish('build', {
  dotfiles: true
}, (err) => {
  if (err) console.error(err)
  else console.log('Published')
})
