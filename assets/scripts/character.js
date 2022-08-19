const searchParam = document.getElementById("param");
const tableM = document.querySelector(".tableM");


const url = new URL(window.location.href);

const link = new URLSearchParams(url.search);

const links = {
  people: "people",
  films: "films",
  starships: "starships",
  vehicles: "vehicles",
  species: "species",
  planets: "planets",
};

console.log(url.search);



searchParam.innerHTML = link.get("search");

// fetch(`https://swapi.dev/api/people/?search=${link.get('search')}`)
fetch(`https://swapi.dev/api/${links.people}/${link.get("id")}/`)
  .then((res) => res.json())
  .then((data) => {
    const searchDiv = tableM.querySelector("table");
    if (searchDiv) searchDiv.remove();

    const sForm = document.createElement("table");
    sForm.classList.add("table-responsive", "table-light");

    const tHead = document.createElement("thead");
    tHead.innerHTML = `<tr><th scope="col">#</th><th scope="col;">Name</th><th scope="col">Height</th><th scope="col">Mass</th><th scope="col">Hair Color</th><th scope="col">Skin Color</th><th scope="col">Eye Color</th><th scope="col">Birth Year</th><th scope="col">Gender</th><th scope="col">Homeworld</th><th scope="col">Species</th><th scope="col">Films</th><th scope="col">Vehicles</th><th scope="col">Starships</th></tr>`;

    sForm.appendChild(tHead);

    const tBody = document.createElement("tbody");

    fetch(data.homeworld)
      .then((homeworld) => homeworld.json())
      .then((homeworld) => {
        tBody.innerHTML += `<tr>
                            <th scope="col">1</th>
                            <td><a href="character.html?search=${data.name.replaceAll(
                              " ",
                              "+"
                            )}">${data.name}</a></td>
                            <td>${data.height}</td>
                            <td>${data.mass}</td>
                            <td>${data.hair_color}</td>
                            <td>${data.skin_color}</td>
                            <td>${data.eye_color}</td>
                            <td>${data.birth_year}</td>
                            <td>${
                              data.gender == "male"
                                ? '<img src="./assets/img/male.png" alt="male" style="height: 3rem" />'
                                : '<img src="./assets/img/female.png" alt="female" style="height: 3rem" />'
                            }</td>
                            <td><a href="${data.homeworld}">${homeworld.name}</td>
                            <td>${
                              data.species.length ? data.species.join() : "None"
                            }</td>
                            `
                            if (data.films.length){
                              const filmButton = document.createElement('a');
                              filmButton.href = '#show'
                              filmButton.id = 'filmShow'
                              filmButton.innerHTML = 'Show';
                              filmButton.classList.add('btn', 'btn-dark')
                              filmButton.dataset.films = '';

                              for (let i = 0; i < data.films.length; i++) {
                                const url = data.films[i]
                                const slash = url.lastIndexOf("/");
                                const slash2 = url.lastIndexOf("/", slash - 1) + 1;
                                const id = url.slice(slash2, slash)

                                filmButton.dataset.films += `${id},`
                              }

                              tBody.innerHTML += `<td>${filmButton.outerHTML}</td>`;
                            } else {
                              tBody.innerHTML += "<td>None</td>"
                            }`
                            
                            <td>`
                            if (data.vehicles.length){
                              const vehButton = document.createElement('a');
                              vehButton.href = '#show'
                              vehButton.id = 'vehShow'
                              vehButton.innerHTML = 'Show';
                              vehButton.classList.add('btn', 'btn-dark')
                              vehButton.dataset.vehicles = '';

                              for (let i = 0; i < data.vehicles.length; i++) {
                                const url = data.vehicles[i]
                                const slash = url.lastIndexOf("/");
                                const slash2 = url.lastIndexOf("/", slash - 1) + 1;
                                const id = url.slice(slash2, slash)

                                vehButton.dataset.vehicles += `${id},`
                              }

                              tBody.innerHTML += `<td>${vehButton.outerHTML}</td>`;
                            } else {
                              tBody.innerHTML += "<td>None</td>"
                            }`
                            </td>
                            <td>`
                            if (data.starships.length){
                              const starButton = document.createElement('a');
                              starButton.href = '#show'
                              starButton.id = 'starShow'
                              starButton.innerHTML = 'Show';
                              starButton.classList.add('btn', 'btn-dark')
                              starButton.dataset.starships = '';

                              for (let i = 0; i < data.starships.length; i++) {
                                const url = data.starships[i]
                                const slash = url.lastIndexOf("/");
                                const slash2 = url.lastIndexOf("/", slash - 1) + 1;
                                const id = url.slice(slash2, slash)

                                starButton.dataset.starships += `${id},`
                              }

                              tBody.innerHTML += `<td>${starButton.outerHTML}</td>`;
                            } else {
                              tBody.innerHTML += "<td>None</td>"
                            }`</td>
                            </tr>`;

                            sForm.appendChild(tBody);
                            tableM.appendChild(sForm);

              const filmBtn = document.getElementById("filmShow")
              const vehicleBtn = document.getElementById("vehShow")
              const starshipBtn = document.getElementById("starShow")

              filmBtn.addEventListener (
                'click', () => {
                  console.log(filmBtn.dataset.films)
                }
              )
              
              vehicleBtn.addEventListener (
                'click', () => {
                  console.log(vehicleBtn.dataset.vehicles)
                }
              )
              
              starshipBtn.addEventListener (
                'click', () => {
                  console.log(starshipBtn.dataset.starships)
                }
              )
      });

    
  }
);