const compromise = require('compromise')

const lightPlugin = {
  words: {
    light: 'Thing'
  },
  tags: {
    Thing: {
      isA: 'Noun'
    }
  },
  regex: {
    uuu: 'Exaggeration'
  }
};

compromise.plugin(lightPlugin)

function verbs (s) {
  return s.verbs().list.reduce((parts, verb) => {
    parts.push(verb.data().parts.verb)

    if (verb.data().parts.auxiliary) {
      parts.push(verb.data().parts.auxiliary)
    }

    return parts
  }, [])
}

function nouns (s) {
  return s.nouns().list.map(noun => noun.data().normal)
}

function parse (text) {
  const s = compromise(text)

  return {
    verbs: verbs(s),
    nouns: nouns(s),
    tags: s.out('tags')
  }
}

module.exports = parse
