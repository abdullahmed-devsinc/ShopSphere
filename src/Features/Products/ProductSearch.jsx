import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
// import useDebounce from "../../hooks/useDebounce";
import { setSearchQuery } from "./productSlice";

export default function ProductSearch() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setSearchQuery(search))
        }, 500)
        return () => clearTimeout(timeout);
    }, [search])

    return (
        <div className="product-search">
            <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>
    )
}