const express = require('express');
const uuid = require('uuid/v4')
// const logger = require('../logger')
const list = require('../books')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(list.bookmarks)
    })
    .post(bodyParser, (req, res) => {
        //defragmented req body
        const { title, url, description, rating } = req.body
        //Bookmark object with generated Id to /post
        const bookmark = { id: uuid(), title, url, description, rating }
        //Push bookmark to list
        list.bookmarks.push(bookmark);
        //Request has been fulfilled and new resourse created
        res
            .status(201)
            .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
            .json(bookmark);
    });



bookmarksRouter
    .route('/bookmarks/:bookmarkId')
    .get((req, res) => {
        // get bookmark id 
        const { bookmarkId } = req.params;
        //Find bookmark id in list of bookmarks
        const bookmark = list.bookmarks.find(each => each.id == bookmarkId);
        //If bookmark id not found, return 404 Not Found
        if (!bookmark) {
            return res.status(404).send('Bookmark Not Found');
        }
        //Json bookmarks response
        res.json(bookmark);
    })
    .delete((req, res) => {
        //et bookmark Id
        const { bookmarkId } = req.params;
        //Declaring bookmark index to delete
        const bookmarkToDelete = list.bookmarks.findIndex(u => u.id === bookmarkId);
        //Splice the bookmark index found
        list.bookmarks.splice(bookmarkToDelete, 1);
        //
        res.send('Deleted');
        //Everything worked, No content status
        res
            .status(204)
            .end();

    })

module.exports = bookmarksRouter