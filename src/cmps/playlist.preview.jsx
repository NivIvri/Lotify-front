export function PlaylistPreview({playlist}){
    return(
        <div className="playlist-preview">
            <img src={`${playlist.songs[0].imgUrl}`} />
            <h3>{playlist.name}</h3>
            {/* liked?
            num of songs */}
        </div>
    )
}