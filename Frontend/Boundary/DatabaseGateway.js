import Axios from 'axios'

import { dataToPublicationList, dataToPublication, 
         dataToProgramList, dataToProgram, 
         dataToInstitutionList, dataToInstitution,
         dataToNewsAndEventsList, dataToNewsAndEvents,
         dataToPeopleList, dataToPeople } from '../Control/ConvertJsonToEntity.js'

const NO_RESULTS = null
const SUCCESS_STATUS = 200
const BASE_URL = "http://localhost:3002/api"


/**
 * getSearchableItems
 * Queries the API for all entries searchable by the search bar from the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Publication>}  searchableItems     Results of the request as a list of Publication objects
 */
export function getSearchableItems(callback) {
    Axios.get(`${BASE_URL}/getSearchableItems`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const searchableItems = dataToPublicationList(res.data)
        callback(searchableItems)
    });
}

/**
 * getAllPublications
 * Queries the API for all Publications from the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Publication>}  publicationList     Results of the request as a list of Publication objects
 */
export function getAllPublications(callback) {
    Axios.get(`${BASE_URL}/getAllPublications`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

/**
 * getAllArtworks
 * Queries the API for all Artwork from the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Publication>}  publicationList     Results of the request as a list of Publication objects
 */
export function getAllArtworks(callback) {
    Axios.get(`${BASE_URL}/getAllArtworks`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

/**
 * getAllVideos
 * Queries the API for all Videos from the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Publication>}  publicationList     Results of the request as a list of Publication objects
 */
export function getAllVideos(callback) {
    Axios.get(`${BASE_URL}/getAllVideos`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

/**
 * getAllExcerpts
 * Queries the API for all Excerpts from the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Publication>}  publicationList     Results of the request as a list of Publication objects
 */
export function getAllExcerpts(callback) {
    Axios.get(`${BASE_URL}/getAllExcerpts`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

/**
 * getPublicationById
 * Queries the API for a Publication from the database, 
 * identified by the id argument provided,
 * and returns a Publication entity object
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {int}                 id                  Database ID of the publication to request from the API.
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {Publication}        aPublication        Result of the request as a Publication object
 */
export function getPublicationById(id, callback) {
    console.log(`getPublicationById called`)
    Axios.get(`${BASE_URL}/getPublicationById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aPublication = dataToPublication(res.data)
        callback(aPublication)
    });
}


/**
 * getAllPrograms
 * Queries the API for all Programs from the database, 
 * and returns all entities in a list of Program entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Program>}      programList         Results of the request as a list of Program objects
 */
export function getAllPrograms(callback) {
    Axios.get(`${BASE_URL}/getAllPrograms`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const programList = dataToProgramList(res.data)
        callback(programList)
    });
}

/**
 * getProgramById
 * Queries the API for a Program from the database, 
 * identified by the id argument provided,
 * and returns a Program entity object
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {int}                 id                  Database ID of the program to request from the API.
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {Program}            aProgram            Result of the request as a Program object
 */
export function getProgramById(id, callback) {
    Axios.get(`${BASE_URL}/getProgramById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aProgram = dataToProgram(res.data)
        callback(aProgram)
    });
}


/**
 * getAllInstitutions
 * Queries the API for all Institutions from the database, 
 * and returns all entities in a list of Institution entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<Institution>}  institutionList     Results of the request as a list of Institution objects
 */
export function getAllInstitutions(callback) {
    Axios.get(`${BASE_URL}/getAllInstitutions`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const institutionList = dataToInstitutionList(res.data)
        callback(institutionList)
    });
}

/**
 * getInstitutionById
 * Queries the API for a Institution from the database, 
 * identified by the id argument provided,
 * and returns a Institution entity object
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {int}                 id                  Database ID of the institution to request from the API.
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {Institution}        anInstitution       Result of the request as a Institution object
 */
export function getInstitutionById(id, callback) {
    Axios.get(`${BASE_URL}/getInstitutionById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const anInstitution = dataToInstitution(res.data)
        callback(anInstitution)
    });
}


/**
 * getAllNewsAndEvents
 * Queries the API for all NewsAndEvents from the database, 
 * and returns all entities in a list of NewsAndEvent entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<NewsAndEvent>} newsAndEventsList   Results of the request as a list of NewsAndEvent objects
 */
export function getAllNewsAndEvents(callback) {
    Axios.get(`${BASE_URL}/getAllNewsAndEvents`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const newsAndEventsList = dataToNewsAndEventsList(res.data)
        callback(newsAndEventsList)
    });
}

/**
 * getNewsAndEventById
 * Queries the API for a NewsAndEvent from the database, 
 * identified by the id argument provided,
 * and returns a NewsAndEvent entity object
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {int}                 id                  Database ID of the NewsAndEvent to request from the API.
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {NewsAndEvent}       aNewsAndEvent       Result of the request as a NewsAndEvent object
 */
export function getNewsAndEventById(id, callback) {
    Axios.get(`${BASE_URL}/getNewsAndEventById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aNewsAndEvent = dataToNewsAndEvents(res.data)
        callback(aNewsAndEvent)
    });
}


/**
 * getAllPeople
 * Queries the API for all People from the database, 
 * and returns all entities in a list of People entity objects
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {list<People>}       peopleList          Results of the request as a list of People objects
 */
export function getAllPeople(callback) {
    Axios.get(`${BASE_URL}/getAllPeople`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const peopleList = dataToPeopleList(res.data)
        callback(peopleList)
    });
}

/**
 * getPeopleById
 * Queries the API for a People from the database, 
 * identified by the id argument provided,
 * and returns a People entity object
 * by calling the callback funtion passed as an argument. 
 * Returns null if not results found or an error occurred.
 * 
 * @param {int}                 id                  Database ID of the People to request from the API.
 * @param {function}            callback            Calls back with results from database query.
 * 
 * @return {People}             aPeople             Result of the request as a People object
 */
export function getPeopleById(id, callback) {
    Axios.get(`${BASE_URL}/getPeopleById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aPeople = dataToPeople(res.data)
        callback(aPeople)
    });
}