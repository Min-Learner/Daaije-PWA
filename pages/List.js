import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/sbClient";
import useDownload from "../utils/useDownload";
import playAudio from "../utils/playAudio";

export default function List() {
  let bottomRef = useRef(null);
  let [copy, setCopy] = useState([]);
  let [uploading, setUploading] = useState(false);
  const router = useRouter();
  const list = useDownload();

  useEffect(() => {
    if (!copy.length && list) setCopy([...list]);
  }, [list]);

  let handleFile = async (e) => {
    setUploading(true);

    const chosenFiles = Array.prototype.slice.call(e.target.files);
    let promises = [];

    chosenFiles.forEach((file) => {
      const fileName = encodeURIComponent(file.name).replace(/%/g, "z");

      function returnPromise() {
        return new Promise(async (resolve, reject) => {
          try {
            await supabase.storage.from("audios").upload(fileName, file);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      }

      if (!list.includes(fileName)) {
        promises.push(returnPromise().catch((e) => console.log(e)));
      }
    });

    await Promise.all(promises);
    setUploading(false);
  };

  let handleSearch = (e) => {
    const keyword = e.target.value;

    if (keyword) {
      let filterList = list.filter((i) => i.includes(keyword));
      setCopy(filterList);
    } else setCopy(list);
  };

  let toBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="table-wrapper text-white">
      <div
        className={`fixed top-0 w-full bottom-0 z-50 max-w-sm flex ${
          uploading ? "" : "hidden"
        }`}
      >
        <p className="m-auto text-3xl w-72 h-48 bg-black/70 flex items-center justify-center">
          上传中...
        </p>
      </div>
      <div className="flex items-center fixed top-0 w-full max-w-sm p-2.5 bg-blue-600">
        <input
          type={"text"}
          className="w-8/12 rounded p-2 text-base outline-none text-black"
          placeholder="搜 索"
          onChange={(e) => handleSearch(e)}
        />
        <input
          id="upload"
          type="file"
          multiple
          accept="audio/*"
          onChange={(e) => handleFile(e)}
          className="hidden"
        />
        <label
          htmlFor="upload"
          className="w-20 rounded ml-1 flex border-2 text-center h-10  border-white"
        >
          <a className={`m-auto ${uploading ? "pointer-events-none" : ""}`}>
            上传文件
          </a>
        </label>
        <div onClick={toBottom} className="ml-auto text-4xl">
          &#x21e9;
        </div>
      </div>
      <div className="w-full px-2.5 pt-14">
        {copy.map((item) => {
          return (
            <div
              className="flex justify-between items-center h-11 px-2.5 odd:bg-white/30"
              key={item}
            >
              <span
                className="flex-1 text-lg overflow-hidden whitespace-nowrap text-ellipsis"
                onClick={() => playAudio(item)}
              >
                {item.split(".")[0]}
              </span>
              {/* <span className='text-xl text-black/60' onClick={() => handdleAction(item)}>✘</span> */}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        ref={bottomRef}
        className="btn bg-green-600/70 mt-3"
        onClick={() => router.push("/")}
      >
        返回
      </button>
    </div>
  );
}
