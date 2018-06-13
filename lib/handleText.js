const buildParameters = require('./buildParameters')
const context = require('./context')
const findOperations = require('./findOperations')
const findResources = require('./findResources')
const hydraFetch = require('hydra-fetch')
const nlp = require('./nlp')

function handleText (endpointUrl, text) {
  const input = nlp(text)

  return hydraFetch(endpointUrl, {context}).then(resource => {
    return findResources(input, resource).then(resourceResults => {
      return findOperations(input, resourceResults)
    }).then(results => {
      const bestResult = results.shift()
      const params = buildParameters(input, bestResult)

      console.log(`found ${bestResult.operation.method} operation at ${bestResult.resource['@id']}`)
      console.log('will send:')

      params.graph().forEach(quad => {
        console.log(` ${quad.predicate.value}: ${quad.object.value}`)
      })

      return bestResult.resource[bestResult.operation.method.toLowerCase()](params)
    })
  })
}

module.exports = handleText
