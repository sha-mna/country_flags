                                    //  PROJECT 1

// let searchBtn = document.getElementById("searchBtn");

// let countryInp = document.getElementById("country-inp");

// searchBtn.addEventListener("click", () => {
//     let countryName = countryInp.value;
//     let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
//     console.log("finalURL", finalURL);
//     fetch(finalURL)
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(data[0]);
//             // console.log(data[0].capital[0]);
//             // console.log(data[0].flags.svg);
//             // console.log(data[0].name.common);
//             // console.log(data[0].continents[0]);
//             // console.log(Object.keys(data[0].currencies)[0]);
//             // console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
//             // console.log(
//             //     Object.values(data[0].languages).toString().split(",").join(",")
//             // );
//             result.innerHTML = `
//                 <img src="${data[0].flags.svg}" class="flag-img">
//                 <h2>${data[0].name.common}<h2/>
//                 <div class="wrapper">
//                     <div class="dataWrapper">
//                         <h4>Capital:</h4>
//                         <span>${data[0].capital[0]}</span>
//                     </div>
//                 </div>
//                 <div class="wrapper">
//                     <div class="dataWrapper">
//                         <h4>Continent:</h4>
//                         <span>${data[0].continents[0]}</span>
//                     </div>
//                 </div>
//                 <div class="wrapper">
//                     <div class="dataWrapper">
//                         <h4>Population:</h4>
//                         <span>${data[0].population}</span>
//                     </div>
//                 </div>
//                 <div class="wrapper">
//                     <div class="dataWrapper">
//                         <h4>Currency:</h4>
//                         <span>
//                             ${data[0].currencies[Object.keys(data[0].currencies)].name} -${Object.keys(data[0].currencies)[0]}
//                         </span>
//                     </div>
//                 </div>
//                 <div class="wrapper">
//                     <div class="dataWrapper">
//                         <h4>Common Languages:</h4>
//                         <span>
//                             ${Object.values(data[0].languages)
//                                 .toString()
//                                 .split(",")
//                                 .join(",")
//                             }
//                         </span>
//                     </div>
//                 </div>           
//             `;         
//         }).catch(() => {
//             if(countryName.length == 0) {
//                 result.innerHTML = `
//                     <h3>The input field cannot be empty.</h3>
//                 `
//             } else {
//                 result.innerHTML = `
//                     <h3>Please enter a valid country name.</h3>
//                 `
//             }
//         })
// });

                            
                    // PROJECT 2

const countriesContainer = document.querySelector('.countriesContainer')
const filterByRegion = document.querySelector('.filterByRegion')
const searchInput = document.querySelector('.searchContainer input')

const themeChanger = document.querySelector('.themeChanger')
                
let allCountriesData

fetch("https://restcountries.com/v3.1/all")
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
})

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        // console.log(country);
        if (country.languages) {
            // console.log(Object.values(country.languages));
        }
        // console.log(country);
        const countryCard = document.createElement('a')
        countryCard.classList.add('countryCard')
        countryCard.href = `/country.html?name=${country.name.common}`

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="cardText">
                <h3 class="cardTitle">${country.name.common}</h3>
                <p><b>Capital: </b>${country.capital}</p>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
            </div>    
        `
        countriesContainer.append(countryCard)
        
    })

}

searchInput.addEventListener('input', (e) => {
    // console.log(e.target.value);
    // console.log(allCountriesData);
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries);
})

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})