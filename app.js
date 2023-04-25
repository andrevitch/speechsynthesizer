const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [{
        image: './img/home.png',
        text: "It's my home"
    },
    {
        image: './img/dog.png',
        text: "My hungry dog"
    },
    {
        image: './img/hungry.png',
        text: "I love burgers!"
    },
    {
        image: './img/oldman.png',
        text: "My happy grandpa"
    },
    {
        image: './img/cat.png',
        text: "My lovely cat"
    },
    {
        image: './img/dance.png',
        text: "Watch me dance"
    },
    {
        image: './img/sing.png',
        text: "I'm singing"
    },
    {
        image: './img/people.png',
        text: "My friends and I"
    },

];

data.forEach(createBox);


//Create speech boxes
function createBox(item) {
    // console.log(item);
    const box = document.createElement('div');

    const {
        image,
        text
    } = item;

    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        //Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    //@todo - speak event
    main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();


//Web Speech API
// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// Set text
function setTextMessage(text) {
    message.text = text;
}

//Speak text
function speakText() {
    speechSynthesis.speak(message);
}

//Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);


//Toggle text box
toggleBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show');
});

//Close button
closeBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show');
});

//Change voice
voicesSelect.addEventListener('change', setVoice);

//Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();