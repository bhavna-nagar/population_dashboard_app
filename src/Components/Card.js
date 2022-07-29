

const Card=({State,Year,Population})=>{
    return(
        <div className="card">
            <div>State:{State}</div>
            <div>Year:{Year}</div>
            <div>Population:{Population}</div>
        </div>
    )
}

export default Card;