import React, {useState, useEffect} from 'react'
import QuickLink from './QuickLink';

const QuickLinks = () => {
  const [topSites, setTopSites]  = useState([]);

 

  useEffect(()=>{
    chrome.topSites.get((arr) => {
     setTopSites(arr.slice(0,5));
     console.log(arr)
    });
  },[])
  return (
    <div className="mt-20 grid text-white text-lg grid-cols-6">
      {topSites.map((site,i) => (
        <QuickLink key={i} title={site.title} url={site.url}/>
      ))}
    </div>
  )
}

export default QuickLinks