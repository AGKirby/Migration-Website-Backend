import Axios from 'axios'

import { dataToPublicationList, dataToPublication, 
         dataToProgramList, dataToProgram, 
         dataToInstitutionList, dataToInstitution } from '../Control/ConvertJsonToEntity.js'

const NO_RESULTS = null


export function getSearchableItems(callback) {
    Axios.get("http://localhost:3002/api/getSearchableItems").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const searchableItems = dataToPublicationList(res.data)
        callback(searchableItems)
    });
}

export function getAllPublications(callback) {
    Axios.get("http://localhost:3002/api/getAllPublications").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllArtworks(callback) {
    Axios.get("http://localhost:3002/api/getAllArtworks").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllVideos(callback) {
    Axios.get("http://localhost:3002/api/getAllVideos").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getAllExcerpts(callback) {
    Axios.get("http://localhost:3002/api/getAllExcerpts").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const publicationList = dataToPublicationList(res.data)
        callback(publicationList)
    });
}

export function getPublicationById(id, callback) {
    console.log("getPublicationById called")
    Axios.get(`http://localhost:3002/api/getPublicationById/${id}`).then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aPublication = dataToPublication(res.data)
        callback(aPublication)
    });
}


export function getAllPrograms(callback) {
    Axios.get("http://localhost:3002/api/getAllPrograms").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const programList = dataToProgramList(res.data)
        callback(programList)
    });
}

export function getProgramById(id, callback) {
    Axios.get(`http://localhost:3002/api/getProgramById/${id}`).then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const aProgram = dataToProgram(res.data)
        callback(aProgram)
    });
}


export function getAllInstitutions(callback) {
    Axios.get("http://localhost:3002/api/getAllInstitutions").then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const institutionList = dataToInstitutionList(res.data)
        callback(institutionList)
    });
}

export function getInstitutionById(id, callback) {
    Axios.get(`http://localhost:3002/api/getInstitutionById/${id}`).then((res)=>{
        if(res.status !== 200 || res.data === NO_RESULTS) {
            callback(NO_RESULTS)
        }
        const anInstitution = dataToInstitution(res.data)
        callback(anInstitution)
    });
}