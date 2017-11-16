import React from 'react';
import {render} from 'react-dom';
import {
    Admin, Resource, fetchUtils, Delete
} from 'admin-on-rest';

import authClient from './authClient'
// import {MatchList, MatchCreate, MatchEdit} from './matches/index';
import {HighlightList, HighlightCreate, HighlightEdit} from "./matches/Highlight"
import {FullMatchCreate, FullMatchEdit, FullMatchList} from "./matches/FullMatch"
import {LivestreamCreate, LivestreamEdit, LivestreamList} from "./livestreams/index"
// import {Dashboard} from './dashboard';

//  Import REST APIs
import customRestClient from './rest/restClient';
import addUploadFeature from './rest/addUploadFeature';


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'})
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', token);
    return fetchUtils.fetchJson(url, options);
};

const apiUrl = '/api';
const restClient = customRestClient(apiUrl, httpClient);
const uploadCapableClient = addUploadFeature(restClient);

render(
    <Admin authClient={authClient} restClient={uploadCapableClient} title="My Dashboard">
        <Resource name="livestreams" list={LivestreamList} edit={LivestreamEdit} create={LivestreamCreate} remove={Delete}/>
        <Resource name="fullMatches" list={FullMatchList} edit={FullMatchEdit} create={FullMatchCreate} remove={Delete}/>
        <Resource name="highlights" list={HighlightList} edit={HighlightEdit} create={HighlightCreate} remove={Delete}  />
    </Admin>,
    document.getElementById('root')
);
