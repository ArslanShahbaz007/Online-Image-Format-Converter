import { fetchFile } from "@ffmpeg/util";
import { toast } from "react-toastify";

export const downloadAudio = async (
  data,
  selectedVideo,
  selectedOption = "jpg"
) => {
  if (!selectedVideo) return;

  try {
    const originalFileNameWithoutExtension = selectedVideo.name
      .split(".")
      .slice(0, -1)
      .join(".");
    const blob = new Blob([data.buffer], { type: `image/${selectedOption}` }); // Use selected option here
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `${originalFileNameWithoutExtension}.${selectedOption}`; // Use selected option here
    anchorElement.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("An error occured during image download");
    // Handle the error here, e.g., show a user-friendly message or perform other actions
  }
};

function getFileExtension(fileName) {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }
  return ""; // No file extension found
}

function removeFileExtension(fileName) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(0, lastDotIndex);
  }
  return fileName; // No file extension found
}

export const convertToAudio = async (
  selectedVideo,
  ffmpegRef,
  selectedOption = "jpg"
) => {
  let ffmpeg = ffmpegRef.current;
  // ffmpeg.on("progress", ({ progress }) => {
  //   console.log(progress);
  // });

  let input = getFileExtension(selectedVideo.name);
  let output = removeFileExtension(selectedVideo.name) + "." + selectedOption;
  await ffmpeg.writeFile(input, await fetchFile(selectedVideo));

  // FFMEG COMMANDS
  let ffmpeg_cmd = [];
  ffmpeg_cmd = ['-i', input, output];
  
  await ffmpeg.exec(ffmpeg_cmd);
  let data = await ffmpeg.readFile(output);
  return { data, selectedVideo };
};
