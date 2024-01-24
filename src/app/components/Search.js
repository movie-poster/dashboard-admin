function Search ({onChange}) {

    return (
        <div  >
            <div className=" d-flex justify-content-between "
                style={{
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    padding:'10px  10px ',

                }}>
                <input style={{
                    width: 'inherit',
                    border: 'none',
                    fontSize: 14,
                    outlineWidth: 0,
                }}
                    placeholder="Consultar " onChange={onChange} />
                {

                    <span className="material-symbols-outlined">
                        search
                    </span>

                }
            </div>

        </div>
    )

}

export default Search;