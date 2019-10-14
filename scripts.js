const app = document.getElementById('root');

// const logo = document.createElement('img');
// logo.src = 'images/create-octocat.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

// app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://jservice.io/api/clues?value=200&category=10', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 0 && request.status < 4000) {
    data.forEach(clue => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = clue.answer;

      const p = document.createElement('p');
      clue.question = clue.question.substring(0, 300);
      p.textContent = `${clue.question}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
