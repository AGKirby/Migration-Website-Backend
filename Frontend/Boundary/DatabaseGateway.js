import Axios from 'axios'

import { dataToPublicationList, dataToPublication, 
         dataToProgramList, dataToProgram, 
         dataToInstitutionList, dataToInstitution,
         dataToNewsAndEventsList, dataToNewsAndEvents } from '../Control/ConvertJsonToEntity.js'

const NO_RESULTS = null
const SUCCESS_STATUS = 200
const BASE_URL = "http://localhost:3002/api"


export function getSearchableItems(callback) {
    Axios.get(`${BASE_URL}/getSearchableItems`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const searchableItems = dataToPublicationList(res.data)
        callback(searchableItems)
    });
}

export function getAllPublications(callback) {
    Axios.get(`${BASE_URL}/getAllPublications`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllArtworks(callback) {
    Axios.get(`${BASE_URL}/getAllArtworks`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllVideos(callback) {
    Axios.get(`${BASE_URL}/getAllVideos`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllExcerpts(callback) {
    Axios.get(`${BASE_URL}/getAllExcerpts`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

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


export function getAllPrograms(callback) {
    Axios.get(`${BASE_URL}/getAllPrograms`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const programList = dataToProgramList(res.data)
        callback(programList)
    });
}

export function getProgramById(id, callback) {
    Axios.get(`${BASE_URL}/getProgramById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aProgram = dataToProgram(res.data)
        callback(aProgram)
    });
}


export function getAllInstitutions(callback) {
    Axios.get(`${BASE_URL}/getAllInstitutions`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const institutionList = dataToInstitutionList(res.data)
        callback(institutionList)
    });
}

export function getInstitutionById(id, callback) {
    Axios.get(`${BASE_URL}/getInstitutionById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const anInstitution = dataToInstitution(res.data)
        callback(anInstitution)
    });
}


export function getAllNewsAndEvents(callback) {
    Axios.get(`${BASE_URL}/getAllNewsAndEvents`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const newsAndEventsList = dataToNewsAndEventsList(res.data)
        callback(newsAndEventsList)
    });
}

export function getInstitutionById(id, callback) {
    Axios.get(`${BASE_URL}/getInstitutionById/${id}`).then((res)=>{
        if(res.status !== SUCCESS_STATUS || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aNewsAndEvent = dataToNewsAndEvents(res.data)
        callback(aNewsAndEvent)
    });
}