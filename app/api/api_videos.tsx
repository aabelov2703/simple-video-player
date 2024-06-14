import { BASE_URL, headers } from "@/utils/constants";
import { NewVideoType } from "@/types/videoType";
import { videosObject } from "@/mock/videos";

const baseUrl = BASE_URL;

export const getVideos = async (userId: string, useMock: boolean = false) => {
  if (useMock) return videosObject;
  try {
    const res = await fetch(`${baseUrl}?user_id=${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (videoId: string, useMock: boolean = false) => {
  if (useMock)
    return { video: videosObject.videos.find((video) => video.id === videoId) };
  try {
    const res = await fetch(`${baseUrl}/single?video_id=${videoId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const postVideo = async (
  video: NewVideoType | {},
  useMock: boolean = false
) => {
  if (useMock) return;
  try {
    const method = "POST";
    const body = JSON.stringify(video);
    const res = await fetch(baseUrl, { method, headers, body });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const putVideo = async (
  video: NewVideoType | {},
  useMock: boolean = false
) => {
  if (useMock) return;
  try {
    const method = "PUT";
    const body = JSON.stringify(video);
    const res = await fetch(baseUrl, { method, headers, body });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
