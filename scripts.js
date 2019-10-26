// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', ''http://jservice.io/api/clues?value=200&category=10, true)

request.onload = function() {
 // Begin accessing JSON data here
var data = JSON.parse(this.response)

data.forEach(clue => {
  // Log each movie's title
  console.log(clue.title)
})
}

// Send request
request.send()
