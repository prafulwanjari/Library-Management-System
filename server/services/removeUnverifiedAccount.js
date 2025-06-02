import cron from 'node-cron'
import { User } from '../models/userModel.js'

// export const removeUnverifiedAccounts=()=>{
//     cron.schedule(" */5 * * * *" ,async()=>{
//     const ThirtyMinutesAgo=new Date(Date.now()-30*60*1000)
//     await User.deleteMany({
//         accountVerified:false,
//         createdAt:{$lt:ThirtyMinutesAgo}
//     })
//     })
// }


export const removeUnverifiedAccounts = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const result = await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });
      console.log(`[CRON] Deleted ${result.deletedCount} unverified users at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('[CRON ERROR] Failed to remove unverified accounts:', error);
    }
  });
};
