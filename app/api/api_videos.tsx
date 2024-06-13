import { BASE_URL, headers } from "@/utils/constants";
import { NewVideoType } from "@/types/videoType";

const baseUrl = BASE_URL;

export const getVideos = async (userId: string) => {
  try {
    const res = await fetch(`${baseUrl}?user_id=${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (videoId: string) => {
  try {
    const res = await fetch(`${baseUrl}/single?video_id=${videoId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const postVideo = async (video: NewVideoType | {}) => {
  try {
    const method = "POST";
    const body = JSON.stringify(video);
    const res = await fetch(baseUrl, { method, headers, body });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const putVideo = async (video: NewVideoType | {}) => {
  try {
    const method = "PUT";
    const body = JSON.stringify(video);
    const res = await fetch(baseUrl, { method, headers, body });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
