import cron from 'node-cron'
import { Borrow } from '../models/borrowModel.js';

import { User } from '../models/userModel.js';
import { sendEmail } from '../utills/sendEmail.js';
export const notifyUsers=()=>{
cron.schedule("*/30 * * * *",async ()=>{
// console.log("scheduling")
try {
    const oneDayAgo=new Date(Date.now()-24*60*60*1000);
    const borrowers= await Borrow.find({
        dueDate:{
            $lt:oneDayAgo
        },
        returnDate:null,
        notified:false,
    })
    for(const el of borrowers){
        if(el.user && el.user.email){
            sendEmail({
                email:el.user.email,
                subject:"Book Return Reminder",
                message:`Hellow ${el.user.name} \n\n  This is reminder that the book you borrowed is due for return today.please return book to library as soon as possible  `
            })
            el.notified=true;
            await el.save()
            // console.log(`Email send to ${el.user.email}`)
        }
    }
    
} catch (error) {
    console.error("Some error occured while notifying users.",error)
}
})
}