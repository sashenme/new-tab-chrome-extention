import React from "react";

const Background = () => {
  return (
    <div
      className="min-w-screen min-h-screen fixed inset-0 -z-20 bg-cover bg-center bg-slate-900"
      style={{ backgroundImage: "url(https://picsum.photos/1920/1080)" }}
    >
      <div className="min-w-screen min-h-screen absolute inset-0 bg-slate-900/40"></div>
    </div>
  );
};

export default Background;
