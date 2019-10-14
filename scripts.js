const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'images/sample.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
    data.forEach(clue => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = clue.title;

      const p = document.createElement('p');
      clue.description = clue.description.substring(0, 300);
      p.textContent = `${clue.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
}

request.send();
