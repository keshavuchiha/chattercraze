import { pool } from '$lib/server/db';
import { verifyToken } from '$lib/utils/verifyToken.js';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async ({ request,cookies }) => {
	let username: string | null = null;
	try {
		const token=cookies.get('x-auth-token');
		console.log("token",token);
		const res = await verifyToken(token);
		username = res.username;
	} catch (err) {
		console.log('society post', err);
	}
	if (username) {
		let res = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
		if (res.rowCount === 0) {
			throw error(404, 'User does not exist');
		}
		const user_id = res.rows[0].user_id;
		console.log("u",user_id);
		res = await pool.query(
			`select s.name,(sm."role" = 'creator') as is_creator,(sm.role is not null) as is_member  from societies s  
        left join society_members sm on s.society_id =sm.society_id 
        and sm.user_id =$1;
        `,
			[user_id]
		);
		// console.log('rows', res.rows);
		const creator_list = res.rows.filter((row) => row.is_creator);
		const member_list = res.rows.filter((row) => row.is_member && !row.is_creator);
		const other_list = res.rows.filter((row) => !row.is_creator && !row.is_member);
		return json({ logged_in: true, creator_list, member_list, other_list });
	} else {
		let res = await pool.query(`select name from societies;`);
		return json({ logged_id: false, society_list: res.rows });
	}
};
