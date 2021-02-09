const ghpages = require('gh-pages')
const dir = 'build'

ghpages.publish(dir, {
  dotfiles: true
}, (err) => {
  if (err) console.error(err)
  else console.log('Published')
})
