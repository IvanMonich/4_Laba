const {Router} = require('express')
const Finance = require('../models/Finance')
const router = Router()

router.post(
    '/get_finance',
    [],
    async (req, res) => {
        try {
            const {userID} = req.body
            id = userID.userID

            const finances = await Finance.findOne({id})

            res.json({finances: finances})
        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!', error: e.message})
        }
    })

router.post(
    '/add_finance',
    [],
    async (req,res) => {
        try {
            const {userID, expenses} = req.body
            console.log(userID, expenses)
            // id = userID.userID

            await Finance.updateOne({userID}, {$set: {userID: userID, expenses: expenses}})

            res.status(200)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!', error: e.message})
        }
    }
)


module.exports = router