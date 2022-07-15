//1. Jeżeli jest wpisane <4 - nie wyszukuje [DONE]
//2. Przygotowanie struktury HTML do podpowiedzi

const search = document.getElementById('search1');

search.addEventListener(
    'keyup',
    (event) => {
        const value = event.target.value;
        if (value.length >= 4) {
            fetch(`https://swapi.dev/api/people/?search=${value}`)
            .then(res => res.json())
                .then(data => {
                    const tips = document.createElement('div');
                    
                    tips.innerHTML = `<span>${value}</span>`;

                    event.target.appendChild(tips)
            })
        }
    }
)