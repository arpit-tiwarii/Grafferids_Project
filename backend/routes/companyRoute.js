import {companyController} from '../controllers/companyController.js'
import express from 'express';
const route = express.Router();

route.post('/add-company', companyController.addCompany)
route.get('/get-All-Company',companyController.getAllCompany)
route.get('/get-Company/:id', companyController.getCompanyById)
route.post('/:companyid/add-review',companyController.addReview)
// route.get('/:companyid/get-review',companyController.getAllReviews)


export default route;