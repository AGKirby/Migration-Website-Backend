import { Readable } from 'stream';

import { getFileInfoById } from '../Control/FetchBoxData.js'

export class Publication {
    constructor(id, title, creationDate, author, fileId, type, tags, blob) {
        this.id = id                                    // integer, unique identifer
        this.title = title                              // string
        this.creationDate = creationDate                // date
        this.author = author                            // string
        this.fileId = fileId                            // int
        this.type = type                                // string
        this.tags = tags                                // list of strings
        this.blobFile = blob                            // Buffer
    }

    async readFileData() {
        const stream = Readable.from(this.blobFile);
        let content = "";
        for await (const chunk of stream) {
            content += chunk;
        }
        return content;
    }

    async getFileDataUrl() {
        const urlCreator = window.URL || window.webkitURL
        const fileUrl = urlCreator.createObjectURL(this.blobFile)
        return fileUrl
    }

    async getContent() {
        const content = await getFileInfoById(this.fileId);
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
