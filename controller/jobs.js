const Job = require('../models/job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, Count: jobs.length })
}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req
    console.log('userid', userId, jobId);
    const job = await Job.findOne({ _id: jobId, createdBy: userId })
    console.log('job details',job);
    if (!job) {
        throw new NotFoundError(`no job with this id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

}

const createjob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updatejob = async (req, res) => {
    const {
         body:{company,position},
         user: { userId },
         params: { id: jobId }, } = req
    console.log({ user: { userId }, params: { id: jobId }, });

    if(company===''||position===''){
        throw new BadRequestError('company or position field cannot be empty ')
    }

    const job= await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,
        {new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`no job with this id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })


}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req
    const job=await Job.findOneAndRemove({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`no job with this id ${jobId}`)
    }
    res.status(StatusCodes.OK).send('it is deleted ')


}



module.exports = {
    getAllJobs, getJob, createjob, updatejob, deleteJob

}