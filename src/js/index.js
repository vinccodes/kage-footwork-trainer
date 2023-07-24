
let allVoices = [];
let shotsToCall = [];
const corners = {
    "1": "front court backhand",
    "2": "front court forehand",
    "3": "mid court forehand",
    "4": "mid court backhand",
    "5": "rear court forehand",
    "6": "rear court backhand"
}

const delayBetweenShots = {
    "1": 7000,
    "2": 6000,
    "3": 5000,
    "4": 4000,
    "5": 3000,
}

const countDown = ["three", "two", "one", "go"]


const voicesDropdown = document.querySelector('.voices');
const speedValue = document.querySelector('.speedValue');
const difficultyDescription = document.querySelector('.difficulty-description');
const btnStop = document.getElementById('btnStop')
const btnStart = document.getElementById('btnStart')


// Event handlers
btnStop.addEventListener('click', main);
btnStart.addEventListener('click', main);
speedValue.addEventListener('input', (event)=>{
    difficultyDescription.textContent = event.target.value; 
})

window.onload= ()=>{
    difficultyDescription.textContent = speedValue.nodeValue;
}


console.log('hello world');

// get reference to speechSynthesis controller
const speechSynth = window.speechSynthesis;
getVoicesFromDevice();

if (speechSynth.onvoiceschanged !== undefined){
    speechSynth.onvoiceschanged = getVoicesFromDevice;
}






// randomly generate the footwork shots based on specified numShots
function generateShots(numShots) {
    const footworkShots = [];
    for (let i = 0; i < numShots; i++){
        let randomShot = Math.ceil(Math.random()*6) // generate random shot between 1-6
        footworkShots.push(corners[randomShot])
    }

    return footworkShots;
}

// get voices from device and populate select dropdown

function getVoicesFromDevice(){
    allVoices = speechSynth.getVoices();
    console.log(allVoices);

    // iterate each device voices and create an <option>
    const result = allVoices.map( voice =>{
        return `<option value="${voice.name}">${voice.name} -- (${voice.lang})</option>`

    }).join('')

    console.log(result);
    voicesDropdown.innerHTML = result;

}

function readyCountdown(){
    let countdownCounter = 0;
    let sentence = new SpeechSynthesisUtterance();
    // begin count down
    sentence.text = countDown[countdownCounter];
    speechSynth.speak(sentence);
    countdownCounter++;
    const countDownId = setInterval(()=>{
        sentence.text = countDown[countdownCounter];
        speechSynth.speak(sentence);
        console.log('playing countdown', countDown[countdownCounter])
        countdownCounter++;
        if (countdownCounter > countDown.length){
            clearInterval(countDownId);
        }
    }, 1000)
}




// main
function main(){
    // generate shots
    shotsToCall = generateShots(12);
    console.log(shotsToCall)
    counter = 0;
    let sentence = new SpeechSynthesisUtterance();
     // play the first shot without delay
    sentence.text = shotsToCall[counter]
    speechSynth.speak(sentence);
    counter++;

    if (counter > 0) {
        const intervalID = setInterval(()=>{
            // let sentence = new SpeechSynthesisUtterance();
            sentence.text = shotsToCall[counter]
            speechSynth.speak(sentence);
            counter++;
            if (counter == shotsToCall.length){
                clearInterval(intervalID);
            }
        }, delayBetweenShots[speedValue.value])
    }
}