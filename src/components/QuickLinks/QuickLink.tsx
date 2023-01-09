import React from "react";
import { faviconImg } from "../../utils/apis";

interface WithKeyProps {
  key: React.Key;
  title: string;
  url: string;
}

const getDomain = url =>{
  let domain = (new URL(url));
  return domain.hostname.replace(/^[^.]+\./g, "");

}

const QuickLink: React.FC<WithKeyProps> = ({ title, url }) => {
  return (
    <a
      className="bg-gradient-to-bl from-slate-300/20 to-slate-100/10 backdrop-blur-sm text-white text-sm rounded-full w-[100px] h-[100px] grid place-content-center border border-white/20 hover:backdrop-blur-lg hover:border-white/50 hover:bg-slate-800/20 transition-all ease-in duration-75"
      href={url}
    >
      <div className="grid gap-2 justify-center text-center">
        <img
          // src={`${faviconImg}${url}`}
          src={`${faviconImg}${getDomain(url)}`}
          className="w-7 mx-auto"
          alt={title}
          aria-label={title}
        />
        <span className="text-xs text-center max-w-[80px]">{title.substring(0,20)}</span>
      </div>
    </a>
  );
};

export default QuickLink;
