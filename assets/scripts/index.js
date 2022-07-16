//1. Jeżeli jest wpisane <4 - nie wyszukuje [DONE]
//2. Przygotowanie struktury HTML do podpowiedzi
//3. Sprawdź czy istnieje .tips (jeśli TAK, usuwamy .tips)

const search = document.getElementById('search1');
const searchForm = document.getElementById('searchForm');

search.addEventListener(
    'keyup',
    (event) => {
        const value = event.target.value;
        if (value.length >= 4) {
            fetch(`https://swapi.dev/api/people/?search=${value}`)
            .then(res => res.json())
                .then(data => {
                    const tipsDiv = document.querySelector('.tips')
                    if (tipsDiv)
                        tipsDiv.remove();

                    const tips = document.createElement('div');
                    tips.classList.add('tips', 'd-flex')
                    for (let i = 0; i < data.results.length; i++) {
                        const tip = document.createElement('a');
                        tip.href = "#";
                        tip.innerHTML = data.results[i].name;
                        
                        tips.appendChild(tip)
    
                        console.log(data);
                    };
                    
                    event.target.closest('form').appendChild(tips);
            })
        }
    }
)

searchForm.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();
        
    }
)