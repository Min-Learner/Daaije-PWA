import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../utils/sbClient";
import useDownload from "../utils/useDownload";
import playAudio from "../utils/playAudio";

export default function List() {
  const bottomRef = useRef(null);
  const [copy, setCopy] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const listRef = useRef(null);
  const list = useDownload();

  useEffect(() => {
    if (!copy.length && list && isInit) {
      setCopy([...list]);
      setIsInit(false);
      listRef.current = [...list];
    }
  }, [list]);

  const handleFile = async (e) => {
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

      if (!listRef.current.includes(file.name)) {
        promises.push(returnPromise().catch((e) => console.log(e)));
        listRef.current.push(file.name);
      }
    });

    setNumberOfFiles(promises.length);
    await Promise.all(promises);
    setUploading(false);
    setCopy([...listRef.current]);
    toBottom();
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;

    if (keyword) {
      const filterList = listRef.current.filter((i) => i.includes(keyword));
      setCopy([...filterList]);
    } else setCopy([...listRef.current]);
  };

  const toBottom = () => {
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
          {numberOfFiles}个文件上传中...
        </p>
      </div>
      <div className="flex items-center fixed top-0 w-full max-w-sm p-2.5 bg-blue-600">
        <input
          type={"text"}
          className="w-7/12 rounded p-2 text-base outline-none text-black"
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
          className="px-2 rounded ml-auto flex border-2 text-center h-10  border-white bg-yellow-500"
        >
          <a className={`m-auto ${uploading ? "pointer-events-none" : ""}`}>
            上 传
          </a>
        </label>
        <Link href="/">
          <a className="px-2 rounded grid place-content-center border-2 h-10  border-white bg-green-600 ml-2">
            返 回
          </a>
        </Link>
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
      <div ref={bottomRef}></div>
    </div>
  );
}
