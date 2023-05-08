import jobModel from "../models/jobModel.js"

//post api to create jobs
export const createJobController = async(req, res, next) =>{
    const {company,position,jobType,description} = req.body
    if(!company || !position){
        next('Please provide Values')
    }
    if(jobType === 'Teaching'){
        next('Teaching job is Not Allowed')
    }
    const newJob={
        company,
        position,
        jobType,
        description
    }
    const job = await jobModel.create(newJob)
    res.status(200).json({
        success : true,
        message : 'Job Added Successfully'
    })

}

export const getAllJobController = async(req, res, next) =>{
    const jobs = await jobModel.find();
    res.status(200).json({
        success: 'true',
        jobs,
        totalJobs : jobs.length
    })
}

export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      position,
      company,
      workLocation,
      salary,
      workType,
      shift,
      description,
    } = req.body;

    console.log(
      position,
      company,
      workLocation,
      salary,
      workType,
      shift,
      description
    );

    if (
      !workLocation ||
      !position ||
      !company ||
      !workType ||
      !shift ||
      !salary ||
      !description
    ) {
      next("Please Provide All fields");
    }
    console.log("Before Monogb Command");
    const job = await jobModel.findOne({ _id: id });

    if (!job) {
      next(`No job Found with this id ${id}`);
    }

    const updateJob = await jobModel.findOneAndUpdate(
      { _id: id },
      {
        position: position,
        company: company,
        workLocation: workLocation,
        salary: salary,
        workType: workType,
        shift: shift,
        description: description,
      }
    );

    res.status(200).json({
      updateJob,
    });
  } catch (e) {
    next("Error in Controller");
  }
};

export const deleteJobController = async(req, res, next) =>{
    try{
        const {id} =req.params
        const job = await jobModel.findOne({_id:id})

        if(!job){
            next('No job Found')
        }

        await job.deleteOne({_id : id});

        res.status(200).json({
            message : "Success, Job Deleted"
        })
    }catch(e){
        next('Error in Controller')
    }
}


export const getOneJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findOne({ _id: id });
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

