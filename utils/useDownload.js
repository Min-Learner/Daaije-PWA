import { useState, useEffect } from "react";
import { supabase } from "./sbClient";

const useDownload = (file = null) => {
  const [data, setData] = useState([]);
  let url, audio;

  useEffect(() => {
    if (!data.length) {
      (async function () {
        const { data, error } = await supabase.storage.from("audios").list();
        if (error) console.log(error);
        else setData(data);
      })();
    }
  }, []);

  if (file) {
    url = urlHelper(file);
  } else {
    url = urlHelper(data[Math.floor(Math.random() * data.length)]?.name);
  }

  if (typeof Audio !== "undefined") audio = new Audio(url);
  const list = [...data].map((file) =>
    decodeURIComponent(file.name.replace(/z/g, "%"))
  );

  return { audio, list };
};

function urlHelper(file) {
  let url = `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audios/${encodeURIComponent(file).replace(
    /%/g,
    "z"
  )}`;
  return url;
}

export default useDownload;
