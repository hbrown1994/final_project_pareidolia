const express = require('express') //imports express library
const router = express.Router() //router enables to send endpoints back to server like middleware
const fs = require('fs') //import file system

router.get('/api/random-cat', (req, res) => {
//sends message back to getCat function in index.htmls
  const cats = fs.readdirSync('./www/images') //reads files in a folder
  const rand = Math.floor(Math.random( ) * cats.length )
  res.json({message: `images/${cats[rand]}` })
})

module.exports = router
