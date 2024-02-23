const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.countryDetails img')
const countryTitle = document.querySelector('.countryDetails h1')
const nativeName = document.querySelector('.nativeName')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.topLevelDomain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.borderCountries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    flagImage.src = country.flags.svg
    countryTitle.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')


    if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;

    } else {
        nativeName.innerText = country.name.common
    }

    if (country.currencies) {
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
    }

    if (country.languages) {
        languages.innerText = Object.values(country.languages).join(', ');
    }

    if (country.capital) {
        capital.innerText = country.capital
    }

    if (country.subRegion) {
        subRegion.innerText = country.subRegion
    }

    if (country.borders) {
        country.borders.forEach((border) => {
            console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const borderCountryTag = document.createElement('a')    
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
    
})