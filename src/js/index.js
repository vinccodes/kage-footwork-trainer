
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
const voicesDropdown = document.querySelector('.voices');
const btnStop = document.getElementById('btnStop')
const btnStart = document.getElementById('btnStart')


// Event handlers
btnStop.addEventListener('click', main);
btnStart.addEventListener('click', main);



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




// main
function main(){
    // generate shots
    shotsToCall = generateShots(12);
    console.log(shotsToCall)
    counter = 0;
    
    const intervalID = setInterval(()=>{
        let sentence = new SpeechSynthesisUtterance();
        sentence.text = shotsToCall[counter]
        speechSynth.speak(sentence);
        counter++;
        if (counter == shotsToCall.length){
            clearInterval(intervalID);
        }
    }, 3000)
}