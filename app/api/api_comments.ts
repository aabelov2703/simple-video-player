import { commentsObject } from "@/mock/comments";
import { BASE_URL, headers } from "@/utils/constants";

const baseUrl = BASE_URL + "/comments";

export const getComments = async (
  videoId: string,
  useMock: boolean = false
) => {
  if (useMock)
    return {
      comments: commentsObject.comments.filter(
        (comment) => comment.video_id === videoId
      ),
    };
  try {
    const res = await fetch(`${baseUrl}?video_id=${videoId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (
  comment: NewCommentType | {},
  useMock: boolean = false
) => {
  if (useMock) return;
  try {
    const method = "POST";
    const body = JSON.stringify(comment);
    const res = await fetch(baseUrl, { method, headers, body });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
