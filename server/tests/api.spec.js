const request = require('supertest');
// import server
const server = require('../app');

const entriesData = require('../data/entries');
const Entry = require('../models/entry');
const { readFromFile } = require('../helpers/readWrite');

describe('API server', () => {
    let api;
    const testUid = 12345;
    let testEntry = {
        id: "another test id",
        timestamp: "another test timestamp",
        title: "Test entry title",
        body: {
            text: "Test entry body",
            gifUrls: ["Test entry gif url"]
        },
        comments: [],
        emojis: {
            likeCount: 0,
            loveCount: 0,
            laughCount: 0
        }
    }

    beforeAll(() => {
        // read the entries from the entries.json file
        readFromFile();
        // add new test entries
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
        // start the server and store it in the api variable
        api = server.listen(5000, () => {
            console.log('Test server running on port 5000');
        });
    });

    afterAll((done) => {
        // close the server, then run done
        console.log('Stopping the test server');
        api.close(done);
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('responds to get /search/all with status 200', async () => {
        const data = (await request(api).get('/search/all')).body;

        expect(data.entries.length).toEqual(entriesData.length);
        expect(data.entries).toEqual(entriesData);
    });

    it('responds to get /search/:id with status 200', (done) => {
        request(api)
            .get('/search/test id')
            .expect({
                "entry": {
                    "id": "test id",
                    "timestamp": "test timestamp",
                    "title": "test tile",
                    "body": {
                        "text": "test body",
                        "gifUrls": []
                    },
                    "comments": [
                        {
                            "id": "test comment",
                            "timestamp": "test comment timestamp",
                            "body": "test comment body"
                        }
                    ],
                    "emojis": {
                        "likeCount": 0,
                        "loveCount": 0,
                        "laughCount": 0
                    }
                }
            })
            .expect(200, done);
    });

    it('responds to an invalid entry id with status 404', (done) => {
        request(api)
            .get('/search/invalid id')
            .expect(404)
            .expect('Entry not found', done)
    });

    it('responds to get /search/page/:num with ', async () => {
        const pageOneEntries = entriesData.slice(0, 11);
        const data = await request(api).get('/search/1').body;

        expect(data.entries.length).toEqual(12);
        expect(data.entries).toEqual(pageOneEntries);
    });

    it('responds to post /update/create with status 200', (done) => {
        request(api)
            .post('/update/create')
            .send(testEntry)
            .set('Accept', 'application/json')
            .expect(201)
            .expect(testEntry, done);
    });

    it('responds to delete /delete/:id with status 204', async () => {
        await request(api).delete('/delete/test id').expect(204);
        const updatedEntries = await request(api).get('/all');

        expect(updatedEntries.body.length).toBe(11);
    });
})