const express=require('express')
const {register}= require('../controller/auth')
const router=express.Router()

const { getAllJobs,getJob,createjob,updatejob,deleteJob}= require('../controller/jobs')

router.route('/').post(createjob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updatejob)

module.exports=router