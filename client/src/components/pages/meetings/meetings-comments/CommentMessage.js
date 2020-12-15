
export default function Comment({ name, message, updated }) {

    return (
        <div className="media mb-3">
            <img
                className="mr-3 bg-light rounded"
                style={{ width: '25px', objectFit: 'cover' }}
                src={name.avatar}
                alt={name.username}
            />

            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <small className="float-right text-muted">{updated.slice(0,16)}</small>
                <h6 className="mt-0 mb-1 text-muted">{name.username}</h6>
                {message}
            </div>
        </div>
    )
}