const fetch = require('node-fetch')
async function getJson(url) {
 const response = await fetch(url)
 return response.json()
}
exports = getJson
