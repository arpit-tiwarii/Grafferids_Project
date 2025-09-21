import Company from "../models/company.js";

 const addCompany = async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).json({msg: 'send data to backend'});
        }
        const fondedOn=req.body.foundedOn.split('T')[0];
        
        const company = await Company.create({...req.body, foundedOn: fondedOn});
        if(company){
            res.status(201).json(company);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg: err.message})
    }
}

 const getAllCompany = async(req,res)=>{
    try{
        const companies = await Company.find();
        if(!companies || companies.length === 0){
            return res.status(404).json({msg: 'No companies found'});
        }
        
        const companiesWithAvgRating = companies.map(company => {
            let averageRating = 0;
            if(company.reviews && company.reviews.length > 0) {
                averageRating = company.reviews.reduce((sum, review) => sum + review.rating, 0) / company.reviews.length;
            }
            return {
                ...company.toObject(),
                rating: averageRating
            };
        });
        
        res.status(201).json(companiesWithAvgRating);
    }catch(err){
        console.log(err);
        res.status(500).json({msg:err})
    }
}


const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addReview = async (req, res) => {
  try {
    const companyId = req.params.companyid;
    if (!req.body) return res.status(400).send("Send data to backend");

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ msg: "Company not found" });

    const newReview = {
      fullName: req.body.fullName,
      subject: req.body.subject,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
    };
    company.reviews.push(newReview);
    await company.save(); 
    res.status(201).json(company.reviews[company.reviews.length - 1]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};


export const companyController={
    getAllCompany,addCompany,getCompanyById,addReview

}
