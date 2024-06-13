"use client";
import { getVideo, putVideo } from "@/app/api/api_videos";
import { Button } from "@/components/button";
import Comments from "@/components/comments";
import Input from "@/components/input";
import TextArea from "@/components/textArea";
import { useAppContext } from "@/hooks/useAppContext";
import { VideoType } from "@/types/videoType";
import { videoBlank } from "@/utils/constants";
import { useParams, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const VideoPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { selectedVideo, setSelectedVideo } = useAppContext();
  const id = params.id as string;
  const [edit, setEdit] = useState(searchParams.get("edit") === "true");
  const [updVideo, setUpdVideo] = useState<VideoType>({ ...videoBlank, id });

  useEffect(() => {
    if (id)
      getVideo(id).then((res) => {
        if (res) {
          setSelectedVideo(res.video);
          setUpdVideo(res.video);
        }
      });
  }, [id, setSelectedVideo]);

  const changeVideoDetails = (
    key: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (updVideo) {
      setUpdVideo({
        ...updVideo,
        [key]: e.target.value,
      });
    }
  };

  const editVideoDetails = () => {
    setEdit(true);
  };

  const saveChanges = () => {
    setEdit(false);
    if (updVideo?.title || updVideo?.description) {
      const updatedVideo = { ...selectedVideo, ...updVideo };
      setSelectedVideo(updatedVideo);
      putVideo(updatedVideo);
    }
  };

  if (!selectedVideo?.id) return null;

  return (
    <section className="w-full flex flex-col justify-center">
      <Input
        className={`text-base font-semibold ${edit ? "bg-m-contrast" : ""}`}
        disabled={!edit}
        value={edit ? updVideo?.title : selectedVideo.title}
        onChange={(e) => {
          if (edit) changeVideoDetails("title", e);
        }}
      />
      <TextArea
        className={`text-base ${edit ? "bg-m-contrast" : ""}`}
        disabled={!edit}
        value={edit ? updVideo?.description : selectedVideo.description}
        onChange={(e) => {
          if (edit) changeVideoDetails("description", e);
        }}
        rows={1}
      />
      {edit ? (
        <Button
          className="block can-hover w-40"
          onClick={saveChanges}
          disabled={!updVideo?.title || !updVideo?.description}
          value="Save changes"
        />
      ) : (
        <Button
          className="block can-hover w-40"
          value="Edit video"
          onClick={editVideoDetails}
        />
      )}

      <video controls src={selectedVideo.video_url} className="w-full my-2" />
      <h6 className="text-xs text-gray-400 italic">
        <span>User: </span>
        {selectedVideo.user_id}
      </h6>
      <Comments />
    </section>
  );
};

export default VideoPage;
