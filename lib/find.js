const elasticlunr = require('elasticlunr')

elasticlunr.clearStopWords()

function score (items, query, property) {
  property = property || 'label'

  const matches = []

  const index = elasticlunr(function () {
    this.setRef('@id')
    this.addField(property)
  })

  items.forEach(item => {
    index.addDoc({
      '@id': item['@id'],
      label: item[property] || ''
    })
  })

  const results = index.search(query, {})

  items.forEach(item => {
    const result = results.filter((result) => {
      return item.iri().toString() === result.ref
    }).shift()

    if (result) {
      matches.push({
        item: item,
        score: result.score
      })
    }
  })

  return matches
}

function find (object, text) {
  const items = object.forEach ? object: [object]

  if (object.member) {
    object.member.forEach(member => items.push(member))
  }

  return score(items, text).sort((a, b) => b.score - a.score)
}

module.exports = find
