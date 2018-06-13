const find = require('./find')
const rdf = require('rdf-ext')
const Simple = require('simplerdf-core')

function buildParameters (input, operationResult) {
  const parameters = new Simple({}, operationResult.resource.iri())

  operationResult.operation.expects.supportedProperty.forEach(supportedProperty => {
    const property = supportedProperty.property
    const values = []

    property.graph().match(property.iri(), rdf.namedNode('http://www.w3.org/ns/shacl#in')).toArray().map(q => q.object).forEach(object => {
      values.push(property.child(object))
    })

    const bestValue = find(values, input.verbs.join(' ')).shift()

    if (bestValue) {
      parameters.graph().add(rdf.quad(
        parameters.iri(),
        property.iri(),
        bestValue.item.iri()
      ))
    }
  })

  return parameters
}

module.exports = buildParameters
