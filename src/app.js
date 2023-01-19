import { useState } from "react";
import React from "react";



export default function App({}) {

    let [memes, setMemes] = useState()


    React.useEffect(function() {
        fetch('https://api.imgflip.com/get_memes')
	.then(response => response.json())
	.then(response => setMemes(prev =>  prev = response.data.memes ))
	.then(response => console.log(response.data.memes))
	.catch(err => console.error(err));
    }, [])
    

    


    let [meme, setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : "https://i.imgflip.com/26am.jpg"
    })


    function getRandomMeme(){
     const memesArray = memes
     const randomNum = Math.floor(Math.random() * memesArray.length)
     setMeme(prevMeme => ({
        ...prevMeme,
       randomImage: memesArray[randomNum].url
     }) )
     console.log(memes)
    }

    function handelInput(event){
        const {name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }


    return (
        <div className="app">
            <div className="forms">
                <input placeholder="top" type="text" name="topText"  value={meme.topText.toUpperCase()} onChange={handelInput}/>
                <input placeholder="bottom" type="text" name="bottomText" value={meme.bottomText.toUpperCase()} onChange={handelInput}/>
            </div>
            <button className="btn" onClick={getRandomMeme}>Generate</button>
            <div className="meme" > 
                <h3 className="meeme-top">{meme.topText}</h3>
                <img src={meme.randomImage} alt="img" ></img>
                <h3 className="meeme-bot">{meme.bottomText}</h3>

            </div>
        </div>
    )
}