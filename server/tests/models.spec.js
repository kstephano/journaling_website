const helpers = require('../helpers/readWrite');
const Entry = require('../models/entry');
let entriesData = require('../data/entries');

describe('Entry model', () => {
    const testUid = 12345;
    const testEntry = {
        title: "Test entry title",
        body: {
            text: "Test entry body",
            gifUrls: ["Test entry gif url"]
        }
    };

    // Read from the entries.json file to populate the entries array with 1 test entry
    beforeAll(() => {
        helpers.readFromFile();
    });

    it('should make an instance of an entry', () => {
        const entry = new Entry({
            id: "id loaded in from file",
            timestamp: "timestamp loaded in from file",
            comments: [],
            emojis: {
                likeCount: 0,
                loveCount: 0,
                laughtCount: 0
            },
            ...testEntry
        });
        
        expect(entry.id).toBe("id loaded in from file");
        expect(entry.timestamp).toBe("timestamp loaded in from file");
        expect(entry.comments).toStrictEqual([]);
        expect(entry.emojis.likeCount).toBe(0);
        expect(entry.emojis.loveCount).toBe(0);
        expect(entry.emojis.laughtCount).toBe(0);
        expect(entry.title).toBe("Test entry title");
        expect(entry.body.text).toBe("Test entry body");
        expect(entry.body.gifUrls[0]).toBe("Test entry gif url");
    });

    it('should return all entries', () => {
        const entries = Entry.all;

        expect(entries).toEqual(entriesData);
    });

    it('should return an entry', () => {
        const entry = Entry.findById('test id');

        expect(entry).toEqual(entriesData[0]);
    });

    it('should throw an error if there is no entry', () => {
        function testError() {
            Entry.findById('invalid id');
        }

        expect(testError).toThrowError('Entry does not exist in the data');
    });

    it('should create an entry', () => {
        Entry.create(testEntry, testUid);
        expect(entriesData[1]).toHaveProperty('id', 'timestamp', 'title', 'body', 'comments', 'emojis');
    });

    it('should delete an entry', () => {
        entriesData = Entry.deleteById(entriesData[1].id);

        expect(entriesData.length).toEqual(1);
        expect(entriesData).not.toContain(entriesData[1]);
    });

    it('should be able to get a list of 12 entries given a valid page number', () => {
        // add entries so that there are 12 in the entriesData array
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);
        Entry.create(testEntry, testUid);

        const retrievedEntries = Entry.getEntriesByPageNumber(1);
        expect(entriesData.length).toEqual(12);
        expect(retrievedEntries.length).toEqual(12);
        expect(entriesData).toEqual(retrievedEntries);
    });

    it('should throw an error if a page number is given is too big for the entriesData array', () => {
        function testError() {
            Entry.getEntriesByPageNumber(5);
        }
        
        expect(testError).toThrowError('Given page number exceeds entries array length');
    });

    it('should be able to increment numOfLikeReacts', () => {
        entriesData[0].emojis.likeCount++;
        expect(entriesData[0].emojis.likeCount).toEqual(1);
    });

    it('should be able to increment numOfLoveReacts', () => {
        entriesData[0].emojis.loveCount++;
        expect(entriesData[0].emojis.loveCount).toEqual(1);
    });

    it('should be able to increment numOfLaughReacts', () => {
        entriesData[0].emojis.laughCount++;
        expect(entriesData[0].emojis.laughCount).toEqual(1);
    });

    it('should be able to update the comments', () => {
        Entry.findById('test id').comments.push({ id: "second comment", timestamp: "time", body: "contents of second comment" });
        expect(entriesData[0].comments.length).toEqual(2);
        expect(entriesData[0].comments[1]).toEqual({ id: "second comment", timestamp: "time", body: "contents of second comment" });
    });
})