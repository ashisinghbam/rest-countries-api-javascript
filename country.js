const countryName = new URLSearchParams(window.location.search).get("name")
const countryFlag = document.querySelector(".country-flag img")
const countryDetailsContainer = document.querySelector(
  ".details-text-container"
)
const themeChanger = document.querySelector('.theme-changer')

const borderCountriesDiv = document.createElement("div")
borderCountriesDiv.classList.add("border-countries")


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const countryData = data[0]
    console.log(countryData)
    countryFlag.src = `${countryData.flags.svg}`
    countryFlag.alt = `Flag of ${countryData.name.common}`
    countryDetailsContainer.innerHTML = `          <h1>${
      countryData.name.common
    }</h1>
    <div class="details-text">
      <div class="details-text-left">
        <p><b>Native Name: </b>${
          countryData.name.nativeName
            ? Object.values(countryData.name.nativeName)[0].common
            : countryData.name.common
        }</p>
        <p><b>Population: </b>${countryData.population.toLocaleString(
          "en-IN"
        )}</p>
        <p><b>Region: </b>${countryData.region}</p>
        <p><b>Sub Region: </b>${countryData.subregion ?? "N/A"}</p>
        <p><b>Capital: </b>${
          countryData.capital ? countryData.capital.join(", ") : "N/A"
        }</p>
      </div>
      <div class="details-text-right">
        <p><b>Top Level Domain: </b>${countryData.tld.join(", ")}</p>
        <p><b>Currencies: </b>${
          countryData.currencies
            ? Object.values(countryData.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"
        }</p>
        <p><b>Languages: </b>${
          countryData.languages
            ? Object.values(countryData.languages).join(", ")
            : "N/A"
        }</p>
      </div>
    </div>`

    if (countryData.borders) {
      const borderCountryPara = document.createElement("p")
      borderCountryPara.innerHTML = `<b>Border Countries:</b>`
      borderCountriesDiv.append(borderCountryPara)

      countryData.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            console.log(borderCountry);
            const borderCountryTag = document.createElement("a")
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`
            borderCountriesDiv.append(borderCountryTag)
          })
      })
      countryDetailsContainer.append(borderCountriesDiv)
      console.log(borderCountriesDiv);
    }
  })

  themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    document.querySelector('.theme-changer i').classList.toggle('fa-regular')
    document.querySelector('.theme-changer i').classList.toggle('fa-solid')
  })