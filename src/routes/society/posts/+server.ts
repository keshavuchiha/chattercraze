import { pool } from '$lib/server/db';
import { verifyToken } from '$lib/utils/verifyToken';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
export const POST:RequestHandler = async ({ request,cookies }) => {
	let username = '';
	try {
		const token=cookies.get('x-auth-token');
		const res = await verifyToken(token);
		username = res.username;
	} catch (e) {
		username = '';
	}
	const { name } = await request.json();
	// console.log(username);
	let res = await pool.query(`select user_id from users where username=$1 limit 1;`, [username]);
	let user_id: string | null = null;
	if (res.rows.length > 0) {
		user_id = res.rows[0].user_id;
        console.log(user_id);
		res = await pool.query(
			`select p.post_id,p.title ,p."content",coalesce(pvc.count , 0) as count
    ,coalesce(pv.vote,0) as vote,
	coalesce(pcc.count,0) as comments_count,
	p.created_at as post_created_at ,
	s."name" ,s.description , u.username,u.username=$1 as is_author,
	i.image_url as post_image_url
    from posts p 
    join societies s on p.society_id  = s.society_id 
    join users u on p.user_id = u.user_id 
    left join post_images i on i.post_id =p.post_id 
    left join post_votes_count pvc on p.post_id=pvc.post_id 
    left join post_votes pv on p.post_id =pv.post_id and pv.user_id=$3
	left join post_comments_count pcc on p.post_id=pcc.post_id
        where s."name" =$2 order by p.created_at desc;`,
			[username, name, user_id]
		);
	} else {
		res = await pool.query(
			`select p.post_id,p.title ,p."content",
			coalesce(pvc.count , 0) as count,
			coalesce(pcc.count,0) as comments_count,
			u.username,	
    p.created_at as post_created_at ,s."name" ,s.description ,i.image_url 
    from posts p 
	join users u on p.user_id = u.user_id
    join societies s on p.society_id  = s.society_id 
    left join post_images i on i.post_id =p.post_id 
    left join post_votes_count pvc on p.post_id=pvc.post_id 
	left join post_comments_count pcc on p.post_id=pcc.post_id
        where s."name" =$1 order by p.created_at desc;`,
			[name]
		);
	}
	// console.log(res.rows);
	return json(res.rows);
};

export const DELETE:RequestHandler = async ({ request ,cookies}) => {
	const token=cookies.get('x-auth-token');
	const { username } = await verifyToken(token);
	const { post_id } = await request.json();
	const client = await pool.connect();
	try {
		await client.query('begin');
		await client.query('delete from comments where post_id=$1;', [post_id]);
		await client.query('delete from post_images where post_id=$1;', [post_id]);
		await client.query('delete from post_votes where post_id=$1;', [post_id]);
		await client.query('delete from posts where post_id=$1;', [post_id]);
        // await client.query()
        // await client.query('refresh materialized view post_votes_count;');      
		await client.query('commit');
	} catch (e) {
		await client.query('rollback');
        console.log(e);
		throw error(500, "Can't delete internal server error. Internal Server Error ");
	} finally {
		client.release();
	}
	const res = await pool.query(
		`delete from posts where post_id=$1 and user_id=(select user_id from users where username=$2);`,
		[post_id, username]
	);
	return json(res.rows);
};
