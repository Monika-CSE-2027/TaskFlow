const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(
            req.user.userId
        ).select("-password");

        const totalTasks =
        await Task.countDocuments({
            userId:req.user.userId
        });

        const completedTasks =
        await Task.countDocuments({
            userId:req.user.userId,
            status:"Completed"
        });

        const pendingTasks =
        await Task.countDocuments({
            userId:req.user.userId,
            status:"Pending"
        });

        const inProgressTasks =
        await Task.countDocuments({
            userId:req.user.userId,
            status:"In Progress"
        });


        res.status(200).json({
            user,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;