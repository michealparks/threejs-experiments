require('gh-pages').publish('build', {
  dotfiles: true
}, (err) => {
  if (err) console.error(err)
  else console.log('Published')
})
