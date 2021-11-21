const helpers = require('../helpers/readWrite');
const entriesData = require('../data/entries');
const Entry = require('../models/entry');

describe('Entry model', () => {
    const testUid = 12345;
    const testEntry = {
        title: "Test entry title",
        body: "Test entry body",
        gifUrl: "Test entry gif url"
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
            numOfLikeReacts: 0,
            numOfLoveReacts: 0,
            numOfLaughReacts: 0,
            ...testEntry
        });
        
        expect(entry.id).toBe("id loaded in from file");
        expect(entry.timestamp).toBe("timestamp loaded in from file");
        expect(entry.comments).toStrictEqual([]);
        expect(entry.numOfLikeReacts).toBe(0);
        expect(entry.numOfLoveReacts).toBe(0);
        expect(entry.numOfLaughReacts).toBe(0);
        expect(entry.title).toBe("Test entry title");
        expect(entry.body).toBe("Test entry body");
        expect(entry.gifUrl).toBe("Test entry gif url");
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
        expect(entriesData[1]).toHaveProperty('id', 'timestamp', 'title', 'body', 'gifUrl', 'comments', 'numOfLikeReact', 'numOfLoveReacts', 'numOfLaughReacts');
    });

    it('should delete an entry', () => {
        const entryToDelete = entriesData[1];
        entryToDelete.delete();

        expect(entriesData.length).toEqual(1);
        expect(entriesData).not.toContain(entryToDelete);
    });

    it('should be able to increment numOfLikeReacts', () => {
        entriesData[0].numOfLikeReacts++;
        expect(entriesData[0].numOfLikeReacts).toEqual(1);
    });

    it('should be able to increment numOfLoveReacts', () => {
        entriesData[0].numOfLoveReacts++;
        expect(entriesData[0].numOfLoveReacts).toEqual(6);
    });

    it('should be able to increment numOfLaughReacts', () => {
        entriesData[0].numOfLaughReacts++;
        expect(entriesData[0].numOfLaughReacts).toEqual(11);
    });

    it('should be able to update the comments', () => {
        Entry.findById('test id').comments.push({ id: "second comment", timestamp: "time", body: "contents of second comment" });
        expect(entriesData[0].comments.length).toEqual(2);
        expect(entriesData[0].comments[1]).toEqual({ id: "second comment", timestamp: "time", body: "contents of second comment" });
    });
})