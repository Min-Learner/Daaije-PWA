import { Howl } from "howler";

export default function playAudio(file, isError, callback, arg) {
  let url;
  if (isError) {
    url = `${file}.mp3`;
  } else {
    url = `${
      process.env.NEXT_PUBLIC_SUPABASE_URL
    }/storage/v1/object/public/audios/${encodeURIComponent(file).replace(
      /%/g,
      "z"
    )}`;
  }

  const audio = new Howl({
    src: [url],
    html5: true,
    onloaderror: function (id, error) {
      callback && callback(arg);
    },
  });
  audio.play();
  audio.on("end", function () {
    callback && !isError && callback(arg);
  });
}
