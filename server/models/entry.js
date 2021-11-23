let entriesData = require('../data/entries');

/**
 * Class to manage the entriesData array and provide operations to
 * get, create, delete, and update entries and their attributes.
 */
class Entry {
    constructor(data) {
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.title = data.title;
        this.body = data.body;
        this.comments = data.comments;
        this.emojis = data.emojis;
    }

    /**
     * Gets the entriesData array
     */
    static get all() {
        return entriesData;
    }

    /**
     * Find the entry in the array which matches the id.
     * 
     * @param {The id of the entry to find} id 
     * @returns The entry that matches the given id.
     */
    static findById(id) {
        return entriesData.find(entry => entry.id === id);
    }

    /**
     * Creates a new entry and pushes it onto the array.
     * 
     * @param {An object containing attributes that correspond to those in an Entry} data 
     */
    static create(data) {
        const newEntry = new Entry({ 
            comments: [],
            emojis: {
                likeCount: 0,
                loveCount: 0,
                laughCount: 0
            },
            ...data 
        });
        entriesData.unshift(newEntry);
    }

    /**
     * Deletes the entry that corresponds to the given ID.
     * 
     * @param {The unique ID of the entry to delete} id 
     */
    static deleteById(id) {
        entriesData = entriesData.filter((entry) => entry.id !== id);
    }

    /**
     * Get entries that correspond to a given page number.
     * 
     * @param {Page number of the entries to retrieve} pageNum 
     * @returns An array of 12 entries that correspond to the given page number.
     */
    static getEntriesByPageNumber(pageNum) {
        const pageSize = 12;
        let startIndex = (parseInt(pageNum) - 1) * pageSize;
        let entriesForPage = entriesData.slice(startIndex, startIndex + pageSize)
        if (entriesForPage.length === 0) {
            throw new Error('Given page number not in range');
        }
        
        return {
            entries: entriesForPage,
            totalEntries: entriesData.length,
            totalPages: Math.ceil(entriesData.length / pageSize)
        }
    }

    /**
     * Adds a comment to an Entry
     * 
     * @param {The data of the comment} data
     * @param {The unique ID of the parent entry} entryId 
     */

    static addCommment(entryId, data) {
        let entry = this.findById(entryId)
        if(entry)
            entry.comments.unshift(data)
        else
            throw new Error(`ID ${entryId} not found, could not add comments`)
    }

    /**
     * Adds a comment to an Entry
     * 
     * @param {The data of the emoji} data
     * @param {The unique ID of the parent entry} entryId 
     */

     static addEmoji(entryId, data) {

        let emoji = this.findById(entryId)
        emoji = emoji.emojis
        if(emoji) {
            if(data.likeCount)
                emoji.likeCount += data.likeCount
            else if(data.loveCount)
                emoji.loveCount += data.loveCount
            else if(data.laughCount)
                emoji.laughCount += data.laughCount
            else
                throw new Error(`Invalid emoji for entry ID: ${entryId}`)
        }
        else
            throw new Error(`ID ${entryId} not found, could not add emojis`)

    }


    /**
     * Deletes a comment given its ID as well as the ID of the parent entry.
     * 
     * @param {The unique ID of the comment to delete} commentId 
     * @param {The unique ID of the parent entry} entryId 
     */
    static deleteCommentById(commentId, entryId) {
        const entry = Entry.findById(entryId);
        // If the entry exists, delete the comment, otherwise throw an error
        if (entry) {
            entry.comments = entry.comments.filter(comment => comment.id != commentId);
        } else {
            throw new Error('Given entry ID is invalid');
        }
    }
}

module.exports = Entry;