import React, { useState, useEffect } from 'react'

import { getSearchableItems } from './Backend/Boundary/DatabaseGateway';


/* Based on: https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js */
function SearchBar() {
    /*** States ***/
    const [allPublications, setallPublications] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    /*** Lifecycle Effects ***/
    const USE_EFFECT_ONLY_ON_MOUNT = Array.from([])  // immutable array, call useEffect only once, on component mount
    /* 
    useEffect(() => {
        getSearchableItems((publicationList) => {
            if(publicationList === null) {
                return // no results, do not modify allPublications state
            }
            setallPublications(publicationList)
        })
    }, USE_EFFECT_ONLY_ON_MOUNT); 
    */

    /* Test data - TODO: Remove and uncomment above useEffect */
    useEffect(() => {
        setallPublications([
            { id: 1, title: 'Press Kit', author: 'Jennifer Reimer Recio', creationDate: '2022-03-16', type: 'Publication', tags: ['Corvallis,OR', 'Bend,OR', 'Oregon State University', 'OSU'] },
            { id: 2, title: 'Press Release 1', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-17', type: 'Publication', tags: ['Corvallis,OR', 'Bend,OR', 'Oregon State University', 'OSU'] },
            { id: 3, title: 'Press Release 2', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-17', type: 'Publication', tags: ['Corvallis,OR', 'Bend,OR', 'Oregon State University', 'OSU'] },
            { id: 4, title: 'Forms of Migration Book 7', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2021-11-29', type: 'Excerpt', tags: ['Oregon State University', 'OSU'] },
            { id: 5, title: 'Forms of Migration Poster', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2021-11-29', type: 'Excerpt', tags: ['Oregon State University', 'OSU'] },
            { id: 6, title: 'Presentation Picture 1', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] },
            { id: 7, title: 'Presentation Picture 2', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] },
            { id: 8, title: 'Presentation Picture 3', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] },
            { id: 9, title: 'Presentation Picture 4', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] },
            { id: 10, title: 'Presentation Picture 5', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] },
            { id: 11, title: 'Presentation Picture 6', author: 'Jennifer Reimer Recio,Stefan Maneval', creationDate: '2022-03-09', type: 'Artwork', tags: ['Corvallis,OR', 'Bend,OR'] }
        ])
    }, USE_EFFECT_ONLY_ON_MOUNT); 

    /*** Interal Functions ***/
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    /* Helper method for determinig if to display a publication based on its creation date from the search terms */
    const monthNames = Array.from(["january", "february", "march", "april", "may", "june",
                                   "july", "august", "september", "october", "november", "december"])
    function getYearMonthDay(dateStr) {  // dateStr: yyyy-MM-dd
        const date = new Date(dateStr);
        const year = date.getFullYear().toString()
        const monthName = monthNames[date.getMonth()]
        const dayNumber = (date.getDate() + 1).toString() 
        return [year, monthName, dayNumber]
    }

    /*** Dynamic Rendering ***/
    const publicationsToDisplay = searchInput.length === 0 && allPublications !== []
        ?   null 
        :   allPublications.filter((aPublication) => {
                const [year, monthName, dayNumber] = getYearMonthDay(aPublication.creationDate)
                const searchTerms = searchInput.toLowerCase().split(" ")
                return searchTerms.every((aSearchTerm) => {  // if all search terms have a "hit" with any of the publication's attributes
                    return aPublication.title.toLowerCase().match(aSearchTerm) 
                        || aPublication.author.toLowerCase().match(aSearchTerm)
                        || year === aSearchTerm
                        || monthName.match(aSearchTerm)
                        || dayNumber === aSearchTerm
                        || aPublication.type.toLowerCase().match(aSearchTerm)
                        || aPublication.tags.some(aTag => aTag.toLowerCase().match(aSearchTerm))
                })
            }).map((aPublication) => 
                <tr key={aPublication.id} onClick={() => {
                    console.log("aPublication clicked with id ", aPublication.id)
                    // Go to page for this item and query backend API & DB for its Blob contents
                }}>
                    <td>{aPublication.title}</td>
                    <td>{aPublication.author}</td>
                    <td>{aPublication.creationDate}</td>
                </tr>
            )

    /*** Static Rendering ***/
    return (
        <div>
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />

            <h3>Search Results:</h3>
            <table>
                <thead>
                    <tr key="table-head">
                        <th>Publication</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {publicationsToDisplay}
                </tbody>
            </table>
        </div>
    )
}

export default SearchBar