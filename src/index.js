import debounce from 'lodash.debounce';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';

import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
import './styles.scss';

import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';

import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';
import countryListItemTpl from '../templates/countries-list.hbs';
import countryMarkupTpl from '../templates/country-markup.hbs';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputChange, 500));

// function onInputChange(e) {
//   if (e.target.value.length >= 1) {
//     API.fetchCountries(e.target.value).then(countries => {
//       if (countries.length >= 2 && countries.length <= 10) {
//         return renderCountryListItem(countries);
//       }
//       if (countries.length === 1) {
//         return renderCountryMarkup(countries);
//       }
//       alert({
//         title: 'Oh No!',
//         text: 'Too many matches found. Please enter a more specific query!',
//       });
//     });
//     resetContent();
//   } else onFetchError();
// }

async function onInputChange(e) {
  try {
    if (e.target.value.length >= 1) {
      resetContent();
      const response = await API.fetchCountries(e.target.value);

      if (response.length >= 2 && response.length <= 10) {
        return renderCountryListItem(response);
      }

      if (response.length === 1) {
        return renderCountryMarkup(response);
      }

      await alert({
        title: 'Oh No!',
        text: 'Too many matches found. Please enter a more specific query!',
      });
    } else onFetchError();
  } catch (error) {
    console.log(error);
  }
}

function onFetchError(error) {
  alert('Wrong input value!');
}

function renderCountryListItem(countries) {
  refs.countryList.innerHTML = countryListItemTpl(countries);
}

function renderCountryMarkup(countries) {
  refs.countryContent.innerHTML = countryMarkupTpl(countries[0]);
}

function resetContent() {
  refs.countryList.innerHTML = '';
  refs.countryContent.innerHTML = '';
}
