import getMe from "../getMe"

export const me = async (ctx) => {
    const me = await getMe()
    ctx.status = 200
    ctx.body = `Logged-In as ${me.display_name || me.id}`
}