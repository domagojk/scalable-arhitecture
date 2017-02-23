export default {
  documentEndpoint: path => `https://api.github.com/repos/${path}/contents/README.md?ref=master`,
  shareDB: 'ws://localhost:8080'
}
