const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const STEAM_API_KEY = process.env.STEAM_API_KEY

async function getSteamLibrary(steamID) {
    const steamLibrary = await axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        })
    return steamLibrary
}

// create user
router.post('/create', async (req, res) => {

    const library = await getSteamLibrary(req.body.steam64)

    if (!library.status) {
        console.log(`There was an issue with the Steam API: Returned ${library.response.status}`)
        return library.response.status
    }

    const user = new User({
        discordUser: req.body.discordUser,
        steam64: req.body.steam64,
        steamLibrary: library.data.response
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error) {
        console.log(error)
    }
})

// delete user
router.delete('/', async (req, res) => {

})

// update user
router.patch('/', async (req, res) => {

})

module.exports = router