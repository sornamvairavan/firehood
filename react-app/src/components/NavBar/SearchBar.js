import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { searchStock } from "../../store/search"

export default function SearchBar() {
    const dispatch = useDispatch()

    const searchResults = useSelector((state) => state.search);

    const [query, setQuery] = useState("")

    useEffect(()=>{
        if (query) {
            dispatch(searchStock(query))
        } 
    }, [dispatch, query])


    return (
        <div className="search-container">
            <div>
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="Search for Stock"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div>
                {query.length !== 0 && (Array.isArray(searchResults) && (
                searchResults.map((result, idx) => (
                    <Link to={`/stocks/${result?.ticker}`} key={idx} onClick={(e) => setQuery("")}>
                        <span className="search-ticker">{result?.ticker}</span> {result?.company_name}
                    </Link>
                ))))}
            </div>
        </div>
    )
}
