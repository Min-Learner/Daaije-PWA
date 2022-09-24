export default function playAudio(file) {
  const url = `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/object/public/audios/${encodeURIComponent(file).replace(
    /%/g,
    "z"
  )}`;
  const audio = new Audio(url);
  audio.play();
}