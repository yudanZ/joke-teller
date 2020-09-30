const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeContainerElement = document.getElementById('jok-container');

// Joke api url
const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Dark?lang=de&blacklistFlags=nsfw,religious,political,racist,sexist&type=single'



// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

function test(){
    //http://www.voicerss.org/api/
    VoiceRSS.speech({
        key: 'fa7e50a274214f6b9ac16e41d64bf3a2',
        src: 'Hello, world!',
        hl: 'de-de',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    
}


//toggleButton disabled function
function toggleButton(){
    buttonElement.disabled = !buttonElement.disabled;
}

async function getJoke()
{
    try{
        const response = await fetch(apiUrl);
        const joke = await response.json();

        getJokeandPlay(joke.joke)
        //disable button
        toggleButton();

    }catch(error) {
        console.log('fetch failed', error)
    }

}


function getJokeandPlay(joke){
    //const jokeString = joke.trim().replace(/ /g, '%20');
    jokeContainerElement.textContent = joke;

    VoiceRSS.speech({
        key: 'fa7e50a274214f6b9ac16e41d64bf3a2',
        src: joke,
        hl: 'de-de',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//getJoke();
//test();

buttonElement.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

