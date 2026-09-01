const { lint, loadLexicon } = require('./linter');
const { install } = require('./installer');
const { formatReport } = require('./formatter');

module.exports = {
  lint,
  loadLexicon,
  install,
  formatReport
};
