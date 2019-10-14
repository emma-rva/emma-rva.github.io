const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'images/IMG_4326.jpg';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://jservice.io/api/clues?value=200&category=10', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
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
}

request.send();
