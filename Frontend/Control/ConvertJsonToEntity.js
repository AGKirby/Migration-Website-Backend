import {Publication, Program, Institution, RecentNewsandEvents} from '../Entity/Entities.js'

/**
 * dataToPublicationList
 * Utility function for converting json array data returned from the API 
 * into a list of Publication entity objects.  
 * 
 * @param {JSON}                data                List of data returned by the API. 
 * 
 * @return {list<Publication>}  publicationList     List of Publication entity objects converted. 
 */
export function dataToPublicationList(data) {
    const publicationList = []
    for(let i = 0; i < data.length; i++) {
        const aPublication = dataToPublication(data[i])
        publicationList.push(aPublication)
    }
    return publicationList
}

/**
 * dataToPublication
 * Utility function for converting json object data returned from the API 
 * into a Publication entity object.  
 * 
 * @param {JSON}                data                Data returned by the API. 
 * 
 * @return {Publication}        aPublication        Publication entity object converted. 
 */
export function dataToPublication(data) {
    return new Publication(
        data.id,
        data.title,
        data.date,
        data.author,
        data.fileId,
        data.type,
        data.tags,
        data.blobBuffer,
        data.blobType
    )
}


/**
 * dataToProgramList
 * Utility function for converting json array data returned from the API 
 * into a list of Program entity objects.  
 * 
 * @param {JSON}                data                List of data returned by the API. 
 * 
 * @return {list<Program>}      programList         List of Program entity objects converted. 
 */
export function dataToProgramList(data) {
    const programList = []
    for(let i = 0; i < data.length; i++) {
        const aProgram = dataToProgram(data[i])
        programList.push(aProgram)
    }
    return programList
}

/**
 * dataToProgram
 * Utility function for converting json object data returned from the API 
 * into a Program entity object.  
 * 
 * @param {JSON}                data                Data returned by the API. 
 * 
 * @return {Program}            aProgram            Program entity object converted. 
 */
export function dataToProgram(data) {
    return new Program(
        data.id,
        data.name,
        data.type,
        data.startDate,
        data.endDate,
        data.programURL,
        data.hostingInstitutions,
        data.tags
    )
}


/**
 * dataToInstitutionList
 * Utility function for converting json array data returned from the API 
 * into a list of Institution entity object.  
 * 
 * @param {JSON}                data                List of data returned by the API. 
 * 
 * @return {list<Institution>} institutionList         List of Institution entity objects converted. 
 */
export function dataToInstitutionList(data) {
    const institutionList = []
    for(let i = 0; i < data.length; i++) {
        const anInstitution = dataToInstitution(data[i])
        institutionList.push(anInstitution)
    }
    return institutionList
}

/**
 * dataToInstitution
 * Utility function for converting json object data returned from the API 
 * into an Institution entity objects.  
 * 
 * @param {JSON}                data                Data returned by the API. 
 * 
 * @return {Institution}        anInstitution       Institution entity object converted. 
 */
export function dataToInstitution(data) {
    return new Institution(
        data.id,
        data.name,
        data.affiliation,
        data.institutionURL
    )
}


/**
 * dataToNewsAndEventsList
 * Utility function for converting json array data returned from the API 
 * into a list of NewsAndEvent entity objects.  
 * 
 * @param {JSON}                data                List of data returned by the API. 
 * 
 * @return {list<NewsAndEvent>} newsAndEventsList   List of NewsAndEvent entity objects converted. 
 */
export function dataToNewsAndEventsList(data) {
    const newsAndEventsList = []
    for(let i = 0; i < data.length; i++) {
        const aNewsAndEvent = dataToNewsAndEvents(data[i])
        newsAndEventsList.push(aNewsAndEvent)
    }
    return newsAndEventsList
}

/**
 * dataToNewsAndEvents
 * Utility function for converting json object data returned from the API 
 * into a NewsandEvents entity object.  
 * 
 * @param {JSON}                data                Data returned by the API. 
 * 
 * @return {NewsandEvents}      aNewsandEvents      NewsandEvents entity object converted. 
 */
export function dataToNewsAndEvents(data) {
    return new RecentNewsandEvents(
        data.ID,
        data.Name,
        data.URL
    )
}