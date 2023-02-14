import { getFileInfoById } from '../Control/FetchBoxData.js'

export class Publication {
    constructor(id, title, creationDate, author, fileId, tags) {
        this.id = id                                    // integer, unique identifer
        this.title = title                              // string
        this.creationDate = creationDate                // date
        this.author = author                            // string
        this.fileId = fileId                            // int
        this.tags = tags                                // list of strings
    }

    async getContent() {
        const content = await getFileInfoById(this.fileId)
        return content;
    }
}

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
