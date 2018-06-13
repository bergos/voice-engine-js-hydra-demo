const googleSpeechToText = require('@voice-engine/stt-google').googleSpeechToText
const handleText = require('./lib/handleText')
const reSpeakerSource = require('@voice-engine/respeakerd').reSpeakerSource
const slice = require('@voice-engine/core').slice

const program = require('commander')

program
  .usage('[options] <text>')
  .option('-e, --endpoint <url>', 'URL of the Hydra endpoint')
  .parse(process.argv)

if (!program.endpoint) {
  console.error('endpoint parameter is required')
  process.exit(1)
}

const source = reSpeakerSource()

source.once('start', () => {
  console.log('Listening...')
})

source.on('speech-start', () => console.log('keyword detected, waiting for command'))
source.on('speech-end', () => console.log('command ended, thinking...'))

const speechToText = googleSpeechToText()

speechToText.on('data', json => {
  const bestResult = json.sort((a, b) => b.confidence- a.confidence).shift()

  console.log('processing: ' + bestResult.text)

  handleText(program.endpoint, bestResult.text).then(() => {
    console.log('done')
  }).catch((err) => {
    console.error(err.stack || err.message)
  })
})

source.pipe(slice({
  start: 'speech-start',
  end: 'speech-end'
})).pipe(speechToText)
