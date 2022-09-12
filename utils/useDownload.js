import { useState, useEffect } from "react";
import { supabase } from "./sbClient";

const useDownload = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async function () {
      const { data, error } = await supabase.storage.from("audios").list();
      if (error) console.log(error);
      else setList(data);
    })();
  }, []);

  if (list.length) {
    return [...list].map((file) =>
      decodeURIComponent(file.name.replace(/z/g, "%"))
    );
  }
};

export default useDownload;
