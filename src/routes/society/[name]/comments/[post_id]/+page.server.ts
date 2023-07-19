import { pool } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const {  post_id } = params;
	console.info('post_id', post_id);
	
    try {
		let res = await pool.query('SELECT * FROM posts WHERE post_id=($1)::uuid limit 1;', [post_id]);
		if (res.rowCount === 0) {
			throw error(404, 'Post not found');
		}
        const title=res.rows[0].title;
        const content=res.rows[0].content;
        const created_at=res.rows[0].created_at;
        return {title,content,created_at};

	} catch (err) {
		throw error(404, 'Post not found');
	}
	// if(res.rowCount===0){
	//     throw error(404,"Post not found");
	// }
	throw error(404, 'Post not found');
};
