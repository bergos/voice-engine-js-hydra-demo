const handleText = require('./lib/handleText')
const program = require('commander')

program
  .usage('[options] <text>')
  .option('-e, --endpoint <url>', 'URL of the Hydra endpoint')
  .parse(process.argv)

if (!program.endpoint) {
  console.error('endpoint parameter is required')
  process.exit(1)
}

handleText(program.endpoint, program.args.join(' ')).catch((err) => {
  console.error(err.stack || err.message)
})
