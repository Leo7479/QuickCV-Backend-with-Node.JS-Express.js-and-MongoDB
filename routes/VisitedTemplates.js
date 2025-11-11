const express = require("express");
const router = express.Router();
const VisitedTemplates = require("../models/VisitedTemplates");

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const visitedTemplates = await VisitedTemplates.findOne({ userId: userId });
        if (!visitedTemplates)
            return res.status(404).json({ message: "No User Records Found" });
        setTimeout(()=>{res.json({ message: "User Found", data: visitedTemplates })},2000);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
})

router.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const data = req.body;

    try {
        const visitedTemplates = await VisitedTemplates.findOne({ userId: userId });
        if(!visitedTemplates){
            const newObj = new VisitedTemplates({
                userId: userId,
                templates: [data.template]
            })
            const result = await newObj.save();
            return res.status(200).json({message: "Created"});
        }
        else{
            if(!visitedTemplates.templates.includes(data.template)){
                visitedTemplates.templates.push(data.template);
                const result = await VisitedTemplates.findOneAndUpdate({userId:userId},visitedTemplates)
                return res.status(200).json({message: "Added"});
            }
            else
                return res.status(200).json({message: "Already Present"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;