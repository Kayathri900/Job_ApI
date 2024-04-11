const express=require('express')
const {register}= require('../controller/auth')
const testUser=require('../middleware/testUser')

const router=express.Router()

const { getAllJobs,getJob,createjob,updatejob,deleteJob,showStats}= require('../controller/jobs')

router.route('/').post(testUser,createjob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').get(getJob).delete(testUser,deleteJob).patch(testUser,updatejob)

module.exports=router