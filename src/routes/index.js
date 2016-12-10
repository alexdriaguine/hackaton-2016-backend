import {Router} from 'express'
import {getOpeningHours} from '../lib'

const router = Router()

router.route('/')
  .get((req, res) => res.status(200).json({message: 'Hej'}))
router.route('/health')
  .get((req, res) => res.status(200).json({status: 'OK'}))

router.route('/opening-hours')
  .get((req, res) => {
    try {    
      const {address} = req.query
      console.log(req.query)
      console.log(address)
      const hours = getOpeningHours(address)
      return res.status(200).json({ data: hours, address })
    } catch (e) {
      return res.status(400).json({error: e.message})
    }
  })

export default router