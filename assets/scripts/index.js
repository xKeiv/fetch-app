//1. Przygotowanie struktury HTML do podpowiedzi [DONE]
//2. Loaderek [X]
//3. Jak zoptymalizować [DONE]
//4. async wait - przeczytać [DONE]
//5. Poczytaj jak zdobywać dane z linku [X]
//6. Do punktu 5. zrób dodatkową stronę. [DONE]
//7. Jesli na dodatkowej stronie będzie w linku Luke+Skywalker, pobierz dane z ?search=Luke+Skywalker [X]

const search = document.getElementById('search1');
const searchForm = document.getElementById('searchForm');
const tableM = document.querySelector('.tableM');

let wait = false;

search.addEventListener(
    'keyup',
    (event) => {
        const value = event.target.value;
        if (value.length >= 4) {
            const timer = setTimeout(() => {
                if (!wait) {
                    wait = true;
                    //Tu Loaderek
                    fetch(`https://swapi.dev/api/people/?search=${value}`)
                        .then(res => res.json())
                        .then(data => {
                            const tipsDiv = document.querySelector('.tips')
                            if (tipsDiv)
                                tipsDiv.remove();

                            const tips = document.createElement('div');
                            tips.classList.add('tips', 'bg-light', 'd-flex', "flex-column", "border-top-0", "border-primary", "rounded-bottom")
                            for (let i = 0; i < data.results.length; i++) {
                                const tip = document.createElement('a');
                                tip.href = `character.html?id=${data.results[i].url}`;
                                tip.innerHTML = data.results[i].name;
                                
                                tips.appendChild(tip)
                                
                                // console.log(data);
                            };
                            
                            event.target.closest('form').appendChild(tips);
                            wait = false;
                    //Tu sie konczy loaderek
                        })
                }
            }, 1000)
        }
    }
)

searchForm.addEventListener(
    'submit',
    (event) => {
        event.preventDefault();
            const value = search.value;
            fetch(`https://swapi.dev/api/people/?search=${value}`)
            .then(res => res.json())
                .then(data => {
                        
                    const searchDiv = tableM.querySelector('table')
                    if (searchDiv)
                        searchDiv.remove();

                    const sForm = document.createElement('table');
                    sForm.classList.add('table','table-light');
                    console.log(data, data.results.length);
                    
                    const tHead = document.createElement('thead')
                            
                    tHead.innerHTML = `<tr><th scope="col">#</th><th scope="col;">Name</th><th scope="col">Height</th><th scope="col">Mass</th></tr>`;

                    sForm.appendChild(tHead)
                    
                    const tBody = document.createElement('tbody');
                    
                    

                    for (let i = 0; i < data.results.length; i++) {

                        tBody.innerHTML += `<tr>
                        <th scope="row">${i+1}</th>
                        <td><a href="character.html?id=${data.results[i].name.replaceAll(' ','+')}">${data.results[i].name}</a></td>
                        <td>${data.results[i].height}</td>
                        <td>${data.results[i].mass}</td>
                    </tr>`
                    };
                        sForm.appendChild(tBody);
                        tableM.appendChild(sForm);
                    })
            
        
    }
)