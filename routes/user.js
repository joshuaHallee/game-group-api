const express = require('express')
const axios = require('axios')
const router = express.Router()
const User = require('../models/User')
const { update } = require('../models/User')
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

async function lookupMultipleUsers(discordUserQuery) {
    const payload = []
    for(let i = 0; i < discordUserQuery.length; i++) {

        let user = await User.findOne({
            discordUser: discordUserQuery[i]
        })

        payload.push(user)
    }
    return payload
}

// create user
router.post('/create', async (req, res) => {

    const library = await getSteamLibrary(req.body.steam64)

    if (!library.status) {
        console.log(`There was an issue with the Steam API: Returned ${library.response.status}`)
        return library.response.status
    }

    try {
        const user = new User({
            discordUser: req.body.discordUser,
            steam64: req.body.steam64,
            steamLibrary: library.data.response
        })

        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error) {
        console.log(error)
    }
})

// update user
router.patch('/update', async (req, res) => {

    const library = await getSteamLibrary(req.body.steam64)

    if (!library.status) {
        console.log(`There was an issue with the Steam API: Returned ${library.response.status}`)
        return library.response.status
    }

    try {

        const conditions = { discordUser: req.body.discordUser }
        const update = { steamLibrary: library.data.response }
        const updatedUser = await User.updateOne(conditions, update)

        res.json(updatedUser)
    } catch (err) {
        console.log(err)
    }
})

// delete user
router.delete('/delete/:discordUser', async (req, res) => {

    try {
        const deletedUser = await User.deleteOne({
            discordUser: req.params.discordUser
        })
        
        res.json(deletedUser)
    } catch (err) {
        console.log(err)
    }
})

async function findDuplicates(gamesList) {
    let sorted_arr = gamesList.slice().sort()
    let commonGames = []
    for (let i = 0; i < sorted_arr.length; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            commonGames.push(sorted_arr[i])
        }
    }
    console.log(commonGames)
    return commonGames
}

// compare user
router.get('/compare', async (req, res) => {

    try {
        let query = req.query.name
        if(!Array.isArray(query)) {
            query = [ query ]
        }

        const result = await lookupMultipleUsers(query)

        const gamesList = []
        result.forEach( result => {
            result.steamLibrary.games.forEach( game => {
                gamesList.push(game.name)
            })
        })

        const commonGames = await findDuplicates(gamesList)

        res.json(commonGames)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router