import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../store/news';
import './News.css'

export default function News() {
    const dispatch = useDispatch();

    const news = useSelector(state => state.news?.news)

    const [warning, setWarning] = useState([])

    useEffect(() => {
        return dispatch(getNews())
            .then((data) => {
                if (data.errors) setWarning(data.errors)
            })
    }, [dispatch])

    return (
    <>  
        <h2 className="news-heading">Top News</h2> 
        {warning.length > 0 && <ul className="warning">
        {warning.map((warning, idx) => <li key={idx}>{warning}</li>)}
        </ul>}
        <div>
            {warning.length === 0 && news && (
                news.map((n) => (
                    <div className="news-card-main">
                      <a href={n.url} target="_blank" className="news-card">
                        <div>
                          <p className="news-source">⚡︎ {n.source}</p>
                          <p className="news-title">{n.headline}</p>
                        </div>
                        <img className="news-img" src={n.image} />
                      </a>
                    </div>
                  ))
            )}
        </div>
    </>
    )
}