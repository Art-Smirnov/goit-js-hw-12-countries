import countryListItemTpl from '../templates/countries-list.hbs';
const debounce = require('lodash.debounce');

const refs = {
  countryList: document.querySelector('.country-list'),
  input: document.querySelector('#country-input'),
};

refs.input.addEventListener('input', debounce(onInputChange, 500));

export default function fetchCountries(searchQuery) {
  const fetchAdress =
    'https://restcountries.eu/rest/v2/name/' + `${searchQuery}`;

  return fetch(fetchAdress).then(response => {
    return response.json();
  });
}

function onInputChange(e) {
  fetchCountries(e.target.value)
    .then(renderCountryListItem)
    .catch(error => {
      console.log(error);
    });
}

function renderCountryListItem(countries) {
  const markup = countries.map(countryListItemTpl).join('');
  refs.countryList.innerHTML = markup;
}
