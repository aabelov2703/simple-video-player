"use client";
import { postComment, getComments } from "@/app/api/api_comments";
import { useEffect, useState } from "react";
import CommentCard from "./commentCard";
import { Button } from "./button";
import { useAppContext } from "@/hooks/useAppContext";
import Modal from "./modal";
import TextArea from "./textArea";

const Comments: React.FC = () => {
  const { user, isModal, setIsModal, selectedVideo } = useAppContext();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (!selectedVideo?.id) return;
    getComments(selectedVideo.id)
      .then((res) => setComments(res.comments))
      .catch((err) => console.log(err));
  }, [selectedVideo?.id]);

  if (!selectedVideo?.id) return;

  const validate = (): boolean => comment.length > 0;

  const showModal = () => {
    setIsModal(true);
  };

  const save = () => {
    if (!validate()) return;
    const newComment: NewCommentType = {
      content: comment,
      user_id: user.userName,
      video_id: selectedVideo.id,
    };

    postComment(newComment)
      .then(() => {
        // request a list of new videos, because there is no ID  in the response
        getComments(selectedVideo.id)
          .then((res) => setComments(res.comments))
          .catch((err) => console.log(err));
      })
      .finally(() => setComment(""));
    setIsModal(false);
  };

  return (
    <article>
      <Button value="Add comment" onClick={showModal} />
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {isModal && (
        <Modal
          close={() => setIsModal(false)}
          save={save}
          isSaveAllowed={validate()}
        >
          <h3 className="text-base">
            <span className="font-semibold">{user.userName}</span>
            {", "}
            <span>
              a comment will be created for the video &quot;
              {selectedVideo.title}
              &quot;
            </span>
          </h3>
          <TextArea onChange={(e) => setComment(e.target.value)} />
        </Modal>
      )}
    </article>
  );
};

export default Comments;
