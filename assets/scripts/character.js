

const url = new URL('https://127.0.0.1:5500/character.html')

const searchPath = new URL(`${url.origin}${url.pathname}?search=`);
const paramSky = new URLSearchParams(`key1=${characterName}`);
    for (let value of paramSky.values()){

    }

console.log(searchPath.href)