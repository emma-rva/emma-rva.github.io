import '../css/global.scss'
import { lowerCaseIt } from './helpers.js'
import { getData } from './getData.js'

"use strict"

let categories = 'http://jservice.io/api/categories?&count=50', 
	questions = "http://jservice.io/api/clues?&category=",
	cluesDiv = document.getElementById('clues'),
	totalDiv = document.getElementById('total'),
	catList = document.getElementsByTagName('li'),
	jeopardy;
	

// let getData = url => {
// 	return fetch(url)
// 		.then(response => response.json())
// 		.catch(error => 
// 			console.error('Error:', error)
// 		)
// } 


//GET CATEGORIES LIST ON LOAD
getData(categories).then( data => {
	var cats='<ul><h2>Choose a category</h2>';
	for(let i=0; i<data.length; i++){
		cats+='<li><span class="hidden">'+data[i].id + '</span><span>' + lowerCaseIt(data[i].title)+'</span></li>'
	}
	cats+='</ul>'
	document.getElementById('catList').innerHTML = cats
	for(var i=0; i<catList.length; i++){
		catList[i].onclick = getClues
	}
});




// function capitalizeIt(string){
// 	var wordArr = string.split(", ")

// 	// console.log(wordArr)
// 	var newArr = []
// 	for(let a of wordArr){
// 		// console.log(a.charAt(0).toUpperCase()+ string.slice(1))
// 		newArr.push(a)
// 		console.log(Array.isArray(newArr))
// 	}
// 	// console.log(newArr)
// 	newArr.join(" ")
// 	// console.log(newArr)
// 	return newArr
// 	// return string.charAt(0).toUpperCase() + string.slice(1)
// }



//GET LIST OF CLUES ON SELECT
function getClues(){
	let selectedCatId = this.querySelector('span').innerText,
		selectedName = this.querySelector('span:nth-child(2n)').innerText,
		questions = 'http://jservice.io/api/clues?&category='+selectedCatId,
		clueHeader = document.getElementById('clue-header'),
		total = 0; 

	this.classList.toggle('selected')
	clueHeader.innerText = lowerCaseIt(selectedName)
	
	getData(questions).then( data => {
		jeopardy='<ul class="list-group">'
		for(let i=0; i<data.length; i++) {
			jeopardy += '<li class="list-group-item">'+data[i].question+
			'<input class="answer" type="text" placeholder="Enter answer" />'+
			'<span class="hidden correct-answer">'+data[i].answer+
			'</span><span class="hidden points">'+data[i].value+'</span></li>';
		}
		jeopardy+='</ul>';
		cluesDiv.innerHTML = jeopardy;

		//CHECK ANSWERS ARE CORRECT
		let answerBox = document.querySelectorAll('.answer');
		
		if(answerBox && answerBox !== null){
			for(let i=0; i<answerBox.length; i++){
				let attempts=0;
				answerBox[i].addEventListener('focus', e => {
					e.target.removeAttribute('placeholder')
				})
				answerBox[i].addEventListener('blur', e => {
					e.target.setAttribute('placeholder', "Enter answer")
				})
				answerBox[i].addEventListener('change', e => {
					let correctAnswer = e.target.nextSibling.innerText,
						feedBack = document.createElement('div'),
						notCorrectAns = e.target.parentNode.querySelector('.incorrect')

					attempts++;	
					if(e.target.value && e.target.value === correctAnswer){
						feedBack.classList.add('correct')
						if(notCorrectAns) notCorrectAns.classList.add('hidden')
						feedBack.innerText='Correct! You\'ve won '+data[i].value+' points'
						answerBox[i].parentNode.appendChild(feedBack)
						total+=data[i].value
						if(total>0) totalDiv.innerText='Total points: '+total
					}else{
						feedBack.classList.add('incorrect')
						if(attempts > 1) {
							notCorrectAns.classList.add('hidden')
							feedBack.innerText = 'No more chances!'
							answerBox[i].disabled = true
							answerBox[i].parentNode.classList.add('disabled')
							attempts=0
						}else{
							feedBack.innerText = 'Try once more'
						}
						answerBox[i].parentNode.appendChild(feedBack)
					}
				})
			}
		} //check answer
	}) //getData
} //getClues




// questions have to be answered in sequence?
// bonus 20 points if answer begins with 'what is...'






