import {Publication, Program, Institution} from '../Entity/Entities.js'

/* Public Utility Function called by DatabaseGateway */
export function dataToPublicationList(data) {
    const publicationList = []
    for(let i = 0; i < data.length; i++) {
        const aPublication = dataToPublication(data[i])
        publicationList.push(aPublication)
    }
    return publicationList
}

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


/* Public Utility Function called by DatabaseGateway */
export function dataToProgramList(data) {
    const programList = []
    for(let i = 0; i < data.length; i++) {
        const aProgram = dataToProgram(data[i])
        programList.push(aProgram)
    }
    return programList
}

/* Public Utility Function called by DatabaseGateway */
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


/* Public Utility Function called by DatabaseGateway */
export function dataToInstitutionList(data) {
    const institutionList = []
    for(let i = 0; i < data.length; i++) {
        const anInstitution = dataToInstitution(data[i])
        institutionList.push(anInstitution)
    }
    return institutionList
}

/* Public Utility Function called by DatabaseGateway */
export function dataToInstitution(data) {
    return new Institution(
        data.id,
        data.name,
        data.institutionURL
    )
}