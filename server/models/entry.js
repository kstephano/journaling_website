const moment = require('moment');

const entriesData = require('../data/entries');

class Entry {
    constructor(data) {
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.title = data.title;
        this.body = data.body;
        this.gifUrl = data.gifUrl;
        this.comments = data.comments;
        this.numOfLikeReacts = data.numOfLikeReacts;
        this.numOfLoveReacts = data.numOfLoveReacts;
        this.numOfLaughReacts = data.numOfLaughReacts;
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
        const timestamp = moment().format();
        const newEntryId = `${uid}${timestamp}`; // entry id consists of user id concatenated with time of entry creation
        const newEntry = new Entry({ 
            id: newEntryId,
            timestamp: timestamp,
            comments: [],
            numOfLikeReacts: 0,
            numOfLoveReacts: 0,
            numOfLaughReacts: 0,
            ...data 
        });
        entriesData.push(newEntry);
    }

    delete() {
        const entryToDelete = entriesData.filter((entry) => entry.id === this.id)[0];
        entriesData.splice(entriesData.indexOf(entryToDelete), 1);
    }

    incrementNumOfLikeReacts() {
        this.numOfLikeReacts++;
    }

    incrementNumOfLoveReacts() {
        this.numOfLoveReacts++;
    }

    incrementNumOfLaughReacts() {
        this.numOfLaughReacts++;
    }

    get id() {
        return this.id;
    }

    get timestamp() {
        return this.timestamp;
    }

    get title() {
        return this.title;
    }

    get body() {
        return this.body;
    }

    get gifUrl() {
        return this.gifUrl;
    }

    get comments() {
        return this.comments;
    }

    get numOfLikeReacts() {
        return this.numOfLikeReacts;
    }

    get numOfLoveReacts() {
        return this.numOfLoveReacts;
    }

    get numOfLaughReacts() {
        return this.numOfLoveReacts;
    }
}

module.exports = Entry;