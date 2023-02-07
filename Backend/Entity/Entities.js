import { getFileInfoById } from '../Control/FetchBoxData'

export class Publication {
    constructor(id, title, creationDate, author, contentURL, publicationIdsIn, tags) {
        this.id = id                                    // integer, unique identifer
        this.title = title                              // string
        this.creationDate = creationDate                // date
        this.author = author                            // string
        this.fileId = fileId                            // int
        this.publicationIdsIn = publicationIdsIn        // list of integers
        this.tags = tags                                // list of strings
    }

    async getContent() {
        const content = await getFileInfoById(this.contentURL)
        return content;
    }
}

// export class Publication {
//     constructor(id, title, creationDate, author, contentURL, artworkIdsContains, tags) {
//         this.id = id                                    // integer, unique identifer
//         this.title = title                              // string
//         this.creationDate = creationDate                // date
//         this.author = author                            // string
//         this.contentURL = contentURL                    // string
//         this.artworkIdsContains = artworkIdsContains    // list of integers
//         this.tags = tags                                // list of strings
//     }

//     async getContent() {
//         const content = await fetch(this.contentURL)
//         return content;
//     }
// }

export class Program {
    constructor(id, name, type, startDate, endDate, programURL, hostingInstitutions, tags) {
        this.id = id                                    // integer, unique identifer
        this.name = name                                // string
        this.type = type                                // string
        this.startDate = startDate                      // date
        this.endDate = endDate                          // date
        this.programURL = programURL                    // string
        this.hostingInstitutions = hostingInstitutions  // list of integers
        this.tags = tags                                // list of strings
    }

    async getContent() {
        const programData = await fetch(this.programURL)
        return programData;
    }
}

export class Institution {
    constructor(id, name, institutionURL) {
        this.id = id                                    // integer, unique identifer
        this.name = name                                // string
        this.institutionURL = institutionURL            // string
    }
}
