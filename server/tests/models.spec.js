const helpers = require('../helpers/readWrite');
const Entry = require('../models/entry');
let entriesData = require('../data/entries');

describe('Entry model', () => {
    const testUid = 12345;
    const testEntry = {
        id: "another test id",
        timestamp: "another test timestamp",
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
            comments: [],
            emojis: {
                likeCount: 0,
                loveCount: 0,
                laughtCount: 0
            },
            ...testEntry
        });
        
        expect(entry.id).toBe("another test id");
        expect(entry.timestamp).toBe("another test timestamp");
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

    it('should return undefined if given an invalid id', () => {
        const entry = Entry.findById('invalid id');

        expect(entry).toEqual(undefined);
    });

    it('should create an entry', () => {
        Entry.create(testEntry, testUid);
        expect(entriesData[1]).toHaveProperty('id', 'timestamp', 'title', 'body', 'comments', 'emojis');
    });

    it('should delete an entry', () => {
        Entry.deleteById(entriesData[1].id);
        entriesData = Entry.all; // update entriesData
  
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

    it('should be able to increment emojis.likeCount', () => {
        Entry.findById('test id').emojis.likeCount++;

        expect(entriesData[0].emojis.likeCount).toEqual(1);
    });

    it('should be able to increment emojis.loveCount', () => {
        Entry.findById('test id').emojis.loveCount++;

        expect(entriesData[0].emojis.loveCount).toEqual(1);
    });

    it('should be able to increment emojis.laughCount', () => {
        Entry.findById('test id').emojis.laughCount++;
        expect(entriesData[0].emojis.laughCount).toEqual(1);
    });

    it('should be able to update the comments', () => {
        Entry.findById('test id').comments.push({ id: "second comment", timestamp: "time", body: "contents of second comment" });

        expect(entriesData[0].comments.length).toEqual(2);
        expect(entriesData[0].comments[1]).toEqual({ id: "second comment", timestamp: "time", body: "contents of second comment" });
    });

    it('should be able to use findById to add a comment', () => {
        Entry.findById('test id').comments.push({
            id: "third test comment",
            timestamp: "time of comment",
            body: "contents"
        });

        expect(entriesData[0].comments.length).toEqual(3);
        expect(entriesData[0].comments[2]).toEqual({
            id: "third test comment",
            timestamp: "time of comment",
            body: "contents"
        });
    });
    
    it('should delete a comment', () => {
        Entry.deleteCommentById('third test comment', 'test id');

        expect(entriesData[0].comments.length).toEqual(2);
        expect(entriesData[0].comments).not.toContain({
            id: "third test comment",
            timestamp: "time of comment",
            body: "contents"
        });
    });

    it('should throw an error if an invalid entry id is given', () => {
        function testError() {
            Entry.deleteCommentById('second test comment', 'invalid id');
        }

        expect(testError).toThrowError('Given entry ID is invalid');
    });
})