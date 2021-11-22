let entriesData = require('../data/entries');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.title = data.title;
        this.body = data.body;
        this.comments = data.comments;
        this.emojis = data.emojis;
    }

    static get all() {
        const entries = entriesData.map((data) => new Entry(data));
        return entries;
    }

    static findById(id) {
        try {
            const data = entriesData.filter((entry) => entry.id === id)[0];
            const entry = new Entry(data);
            return entry;
        } catch(e) {
            throw new Error('Entry does not exist in the data');
        }
    }

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

    static deleteById(id) {
        entriesData = entriesData.filter((entry) => entry.id !== id);
        return entriesData;
    }

    static getEntriesByPageNumber(pageNum) {
        let startIndex = (pageNum - 1) * 12;
        let entriesForPage = [];

        if (startIndex > entriesData.length) {
            throw 'Given page number exceeds entries array length';
        } else {
            for (let i = 0; i < 12; i++) {
                entriesForPage[i] = entriesData[startIndex];
                startIndex++;
            }
        }
        return entriesForPage;
    }
}

module.exports = Entry;