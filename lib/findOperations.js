const find = require('./find')

function findOperations (input, resourceResults) {
  return resourceResults.reduce((results, resourceResult) => {
    resourceResult.item.api().supportedOperation.filter(o => o.method !== 'GET').forEach(supportedOperation => {
      find(supportedOperation, input.verbs.join(' ')).forEach(operationResult => {
        results.push({
          resource: resourceResult.item,
          operation: operationResult.item,
          score: resourceResult.score * operationResult.score
        })
      })
    })

    return results.sort((a, b) => b.score - a.score)
  }, [])
}

module.exports = findOperations
