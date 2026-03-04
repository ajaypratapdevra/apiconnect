const express = require("express");
const redisClient = require("./redisClient");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

let TOTAL_SEATS = 100;

// Booking endpoint
router.post("/api/book", async (req,res)=>{

    const seatLock = await redisClient.set(
        "seat_lock",
        "locked",
        { NX: true, EX: 5 }
    );

    if(!seatLock){
        return res.status(409).json({
            success:false,
            message:"Seat is currently being booked by another user"
        });
    }

    try{

        const remaining = await redisClient.get("remaining_seats") || TOTAL_SEATS;

        if(remaining <= 0){
            return res.status(400).json({
                success:false,
                message:"No seats available"
            });
        }

        const newRemaining = remaining - 1;
        await redisClient.set("remaining_seats", newRemaining);

        res.json({
            success:true,
            bookingId: uuidv4(),
            remaining:newRemaining
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }

});
module.exports = router;