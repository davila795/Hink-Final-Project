import Comment from './CommentMessage'

export default function CommentList(props) {

    return (
        <div className="commentList">
            <h6 className="text-muted mb-4">
                <span className="badge badge-success">{props.comments.length}</span>{" "}
        Comment{props.comments.length > 0 ? "s" : ""}
            </h6>

            {props.comments.length === 0 && (
                <div className="alert text-center alert-info">
                    Be the first to comment
                </div>
            )}

            {props.comments.map((comment, index) => (
                <Comment key={index} {...comment} />
            ))}
        </div>
    )

}