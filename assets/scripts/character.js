const searchParam = document.getElementById('param')
const tableM = document.querySelector('.tableM')

const url = new URL (window.location.href)

const link = new URLSearchParams(url.search);

link.get('search');

console.log(url.search);

searchParam.innerHTML = link.get('search')

fetch(`https://swapi.dev/api/people/?search=${link.get('search')}`)
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
                        <td><a href="character.html?search=${data.results[i].name.replaceAll(' ','+')}">${data.results[i].name}</a></td>
                        <td>${data.results[i].height}</td>
                        <td>${data.results[i].mass}</td>
                    </tr>`
                    };

                    sForm.appendChild(tBody);
                    tableM.appendChild(sForm);
                    })