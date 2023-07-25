interface CommentType{
	comment_id:string;
	username:string;
	content:string;
	created_at:Date;
	votes_count:number;
	vote:number;
    parent_id:string|null
}
interface CommentTreeType{
	parent:string;
	children:CommentTreeType[];
}
export {CommentType,CommentTreeType};