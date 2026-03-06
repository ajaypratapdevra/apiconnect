
let seats = {
    "1": "available",
    "2": "available",
    "3": "available",
    "4": "available",
    "5": "available"
};

// Function to get the status of a seat by its ID. It returns the current status of the seat (available or booked).
const getSeatStatus = (seatId) => {
    return seats[seatId];
};

// Function to book a seat by its ID. It updates the seat status to "booked".
const bookSeat = (seatId) => {
    seats[seatId] = "booked";
};


export { getSeatStatus, bookSeat };