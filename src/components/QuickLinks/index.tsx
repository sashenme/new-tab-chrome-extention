import React, {useState, useEffect} from 'react'
import QuickLink from './QuickLink';

const QuickLinks = () => {
  const [topSites, setTopSites]  = useState([]);

 

  useEffect(()=>{
    chrome.topSites.get((arr) => {
     setTopSites(arr.slice(0,10)); 
    });
  },[])
  return (
    <div className="mt-20 grid text-white text-lg grid-cols-5 gap-10">
      {topSites.map((site,i) => (
        <QuickLink key={i} title={site.title} url={site.url}/>
      ))}
    </div>
  )
}

export default QuickLinks