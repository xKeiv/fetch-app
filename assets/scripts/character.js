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

const createButton = (data, id, name) => {
  if (data.length){
    const button = document.createElement('a');
    button.href = '#show'
    button.id = id
    button.innerHTML = `Show ${name}`;
    button.classList.add('btn', 'btn-dark')
    button.dataset.ids = '';

    for (let i = 0; i < data.length; i++) {
      const url = data[i]
      const slash = url.lastIndexOf("/");
      const slash2 = url.lastIndexOf("/", slash - 1) + 1;
      const id = url.slice(slash2, slash)

      button.dataset.ids += `${id},`
    }

    return button.outerHTML
  } else {
    return "None"
  }
}

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
                            <td>${createButton(data.films, 'filmShow', 'films')}</td>
                            <td>${createButton(data.vehicles, 'vehShow', 'vehicles')}</td>
                            <td>${createButton(data.starships, 'starShow','starships')}</td>
                            </tr>`;

                            sForm.appendChild(tBody);
                            tableM.appendChild(sForm);

              const filmBtn = document.getElementById("filmShow")
              const vehicleBtn = document.getElementById("vehShow")
              const starshipBtn = document.getElementById("starShow")

              const filmBtnData = filmBtn.dataset.ids.split(',').slice(0, -1)
              const vehicleBtnData = vehicleBtn.dataset.ids.split(',').slice(0, -1)
              const starshipBtnData = starshipBtn.dataset.ids.split(',').slice(0, -1)


              filmBtn.addEventListener (
                'click', () => {
                  console.log(filmBtnData)
                }
              )
              
              vehicleBtn.addEventListener (
                'click', () => {
                  console.log(vehicleBtnData)
                }
              )
              
              starshipBtn.addEventListener (
                'click', () => {
                  console.log(starshipBtnData)
                }
              )
      });

    
  }
);