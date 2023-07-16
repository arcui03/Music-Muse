console.log("Welcome To Spotify");
{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}

//iniialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById("masterPlay");
let myprogressbar=document.getElementById('myprogressbar');
let masterSongName = document.getElementById('masterSongName');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItems'));
let song = [
    {songName:"Chala Jaata Hu - Sanam", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName:"Baarishein - Anuv Jain", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName:"Break Free - WCMT", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName:"Choo Lo - The Local Train", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName:"Kasoor - Prateek Kuhad", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName:"Tere Jeya Hor Disda - The Yellow Diary", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg"},
    {songName:"Tilak - Bombay Bandook", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName:"Waqt Ki Baatein - Dream Note", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"}
]

songItem.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
})


const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeallplays();
        songIndex=parseInt(e.target.id);

        masterSongName.innerText=song[songIndex].songName;

        gif.style.opacity=1;

        console.log(songIndex);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })

   
})

//NEXT SONG
document.getElementById("next").addEventListener('click', ()=>{

    if(songIndex == 7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }

    masterSongName.innerText=song[songIndex].songName;

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//Prev Song
document.getElementById("prev").addEventListener('click', ()=>{
    if(songIndex == 0){
        songIndex=7;
    }
    else{
        songIndex-=1;
    }

    masterSongName.innerText=song[songIndex].songName;

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//handling play pause in masterplay

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){     //song is not being played currently
        console.log("clicked play/pause");
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener("timeupdate", ()=>{
    console.log("TIME UPDATE");

    //update seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);

    myprogressbar.value=progress;
    
})

myprogressbar.addEventListener("change", ()=>{
    audioElement.currentTime=(myprogressbar.value * audioElement.duration)/100;
})
