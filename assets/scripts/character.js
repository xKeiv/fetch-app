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
                    sForm.classList.add('table','table-responsive','table-light');
                    console.log(data, data.results.length);
                    
                    const tHead = document.createElement('thead')
                            
                    tHead.innerHTML = `<tr><th scope="col">#</th><th scope="col;">Name</th><th scope="col">Height</th><th scope="col">Mass</th><th scope="col">Hair Color</th><th scope="col">Skin Color</th><th scope="col">Eye Color</th><th scope="col">Birth Year</th><th scope="col">Gender</th><th scope="col">Homeworld</th><th scope="col">Species</th><th scope="col">Films</th><th scope="col">Vehicles</th><th scope="col">Starships</th></tr>`;

                    sForm.appendChild(tHead)
                    
                    const tBody = document.createElement('tbody');
                    
                    

                    for (let i = 0; i < data.results.length; i++) {
                            fetch(data.results[i].homeworld)
                                .then(homeworld => homeworld.json())
                                .then(homeworld => {
                        tBody.innerHTML += `<tr>
                        <th scope="col">${i+1}</th>
                        <td><a href="character.html?search=${data.results[i].name.replaceAll(' ','+')}">${data.results[i].name}</a></td>
                        <td>${data.results[i].height}</td>
                        <td>${data.results[i].mass}</td>
                        <td>${data.results[i].hair_color}</td>
                        <td>${data.results[i].skin_color}</td>
                        <td>${data.results[i].eye_color}</td>
                        <td>${data.results[i].birth_year}</td>
                        <td>${data.results[i].gender}</td>
                        <td><a href="${data.results[i].homeworld}">${homeworld.name}</td>
                        <td>${data.results[i].species.length ? data.results[i].species.join():'None'}</td>
                        <td>${data.results[i].films.length ? data.results[i].films.join():'None'}</td>
                        <td>${data.results[i].vehicles.length ? data.results[i].vehicles.join():'None'}</td>
                        <td>${data.results[i].starships.length ? data.results[i].starships.join():'None'}</td>
                    </tr>`})
                    };

                    sForm.appendChild(tBody);
                    tableM.appendChild(sForm);
                    })