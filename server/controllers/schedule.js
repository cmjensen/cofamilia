module.exports = {
    getSchedule: async ( req, res ) => {
        const db = req.app.get('db')
        const allSchedule = await db.schedule.all_schedule([])
    },
    addSchedule: async ( req, res ) => {
        const db = req.app.get('db')
        if( req.session.user ){
            const { user_id } = req.session.user
            const { date } = req.body
            const newSchedule = await db.schedule.add_schedule([ date, user_id, child_id ])
        }
    }
}