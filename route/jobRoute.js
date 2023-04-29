import express from "express"
import { createJobController, getAllJobController, updateJobController, deleteJobController } from "../controllers/jobController.js"

const route = express.Router()

route.post('/create-jobs', createJobController)

route.get('/get-jobs', getAllJobController)

//update
route.patch('/update-job/:id', updateJobController)

//delete
route.delete('/delete-job/:id', deleteJobController)


export default route