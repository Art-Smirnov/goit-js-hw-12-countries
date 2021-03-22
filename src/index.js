import './styles.scss';

// import { alert, defaultModules } from '@pnotify/core';
// import * as PNotifyMobile from '@pnotify/mobile';
// defaultModules.set(PNotifyMobile, {});

// import 'material-design-icons/iconfont/material-icons.css';
// import '@pnotify/core/dist/Material.css';
// import { defaults } from '@pnotify/core';

// defaults.styling = 'material';
// defaults.icons = 'material';
// defaults.type = 'error';
//===================
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';

// import PNotify from 'pnotify/dist/es/PNotify';
// import PnotifyButtons from 'pnotify/dist/es/PNotifyButtons';
// import 'pnotify/dist/es/PNotifyStyleMaterial.js';
// PNotify.defaults.styling = 'material';
// PNotify.defaults.icons = 'material';

import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';

import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
//=============================
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';
import countryListItemTpl from '../templates/countries-list.hbs';
import countryMarkupTpl from '../templates/country-markup.hbs';
const refs = getRefs();
const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  API.fetchCountries(e.target.value)

    .then(countries => {
      resetContent();
      if (countries.length > 10) {
        return alert({
          title: 'Oh No!',
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      if (countries.length === 1) {
        return renderCountryMarkup(countries);
      }
      renderCountryListItem(countries);
    })

    .catch(onFetchError)
    .finally(resetContent());
}

function onFetchError(error) {
  alert('Wrong input value!');
}

function renderCountryListItem(countries) {
  const markup = countries.map(countryListItemTpl).join('');
  refs.countryList.innerHTML = markup;
}

function renderCountryMarkup(countries) {
  const markup = countryMarkupTpl(countries[0]);
  refs.countryContent.innerHTML = markup;
}

function resetContent() {
  refs.countryList.innerHTML = '';
  refs.countryContent.innerHTML = '';
}
