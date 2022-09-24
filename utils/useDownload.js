import { useState, useEffect } from "react";
import { supabase } from "./sbClient";

const useDownload = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let shouldCancel = false;
    (async function () {
      const { data, error } = await supabase.storage.from("audios").list();
      if (!shouldCancel) {
        if (error) console.log(error);
        else setList(data);
      }
    })();
    return () => (shouldCancel = true);
  }, []);

  if (list.length) {
    return [...list].map((file) =>
      decodeURIComponent(file.name.replace(/z/g, "%"))
    );
  }
};

export default useDownload;
