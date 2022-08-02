const searchParam = document.getElementById('param')
const tableM = document.querySelector('.tableM')

const url = new URL (window.location.href)

const link = new URLSearchParams(url.search);

const links = {
    people: 'people',
    films: 'films',
    starships: 'starships',
    vehicles: 'vehicles',
    species: 'species',
    planets: 'planets',
}

console.log(url.search);

searchParam.innerHTML = link.get('search')

// fetch(`https://swapi.dev/api/people/?search=${link.get('search')}`)
fetch(`https://swapi.dev/api/${links.people}/${link.get('id')}/`)
            .then(res => res.json())
                .then(data => {

                    const searchDiv = tableM.querySelector('table')
                    if (searchDiv)
                        searchDiv.remove();

                    const sForm = document.createElement('table');
                    sForm.classList.add('table-responsive','table-light');
                    
                    
                    const tHead = document.createElement('thead')
                            
                    tHead.innerHTML = `<tr><th scope="col">#</th><th scope="col;">Name</th><th scope="col">Height</th><th scope="col">Mass</th><th scope="col">Hair Color</th><th scope="col">Skin Color</th><th scope="col">Eye Color</th><th scope="col">Birth Year</th><th scope="col">Gender</th><th scope="col">Homeworld</th><th scope="col">Species</th><th scope="col">Films</th><th scope="col">Vehicles</th><th scope="col">Starships</th></tr>`;

                    sForm.appendChild(tHead)
                    
                    const tBody = document.createElement('tbody');
                    
                    

                    
                    fetch(data.homeworld)
                        .then(homeworld => homeworld.json())
                        .then(homeworld => {
                            tBody.innerHTML += `<tr>
                            <th scope="col">1</th>
                            <td><a href="character.html?search=${data.name.replaceAll(' ','+')}">${data.name}</a></td>
                            <td>${data.height}</td>
                            <td>${data.mass}</td>
                            <td>${data.hair_color}</td>
                            <td>${data.skin_color}</td>
                            <td>${data.eye_color}</td>
                            <td>${data.birth_year}</td>
                            <td>${data.gender}</td>
                            <td><a href="${data.homeworld}">${homeworld.name}</td>
                            <td>${data.species.length ? data.species.join():'None'}</td>
                            <td>${data.films.length ? data.films.join():'None'}</td>
                            <td>${data.vehicles.length ? data.vehicles.join():'None'}</td>
                            <td>${data.starships.length ? data.starships.join():'None'}</td>
                            </tr>`
                        }
                    )

                    sForm.appendChild(tBody);
                    tableM.appendChild(sForm);
                    
                    })