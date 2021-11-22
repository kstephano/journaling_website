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
     * @param {The unique ID of the user creating the Entry} uid 
     */
    static create(data, uid) {
        const timestamp = Date.now();
        const newEntryId = `${uid}${timestamp}`; // entry id consists of user id concatenated with time of entry creation
        const newEntry = new Entry({ 
            id: newEntryId,
            timestamp: timestamp,
            comments: [],
            emojis: {
                likeCount: 0,
                loveCount: 0,
                laughCount: 0
            },
            ...data 
        });
        entriesData.push(newEntry);
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
        let startIndex = (pageNum - 1) * 12;
        let entriesForPage = [];

        // check if starting index exceeds the length of the entriesData array, and throw and error if true
        if (startIndex > entriesData.length) {
            throw 'Given page number exceeds entries array length';
        } else {
            // Iterate 12 times and push the corresponding entries onto the new array
            for (let i = 0; i < 12; i++) {
                entriesForPage[i] = entriesData[startIndex];
                startIndex++;
            }
        }
        return entriesForPage;
    }

    /**
     * Deletes a comment given its ID as well as the ID of the parent entry.
     * 
     * @param {The unique ID of the comment to delete} commentId 
     * @param {The unique ID of the parent entry} entryId 
     */
    static deleteCommentById(commentId, entryId) {
        const entry = entriesData.find(entry => entry.id === entryId);
        // If the entry exists, delete the comment, otherwise throw an error
        if (entry) {
            entry.comments = entry.comments.filter(comment => comment.id != commentId);
        } else {
            throw 'Given entry ID is invalid';
        }
    }
}

module.exports = Entry;