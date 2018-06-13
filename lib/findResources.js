const context = require('./context')
const find = require('./find')
const hydraFetch = require('hydra-fetch')

function findResources (input, resource) {
  const results = find(resource, input.nouns.join(' '))

  return Promise.all(results.map(result => {
    return hydraFetch(result.item['@id'], {context}).then(item => {
      return {
        item,
        score: result.score
      }
    })
  }))
}

module.exports = findResources
