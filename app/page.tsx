"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { useEffect, useState } from "react";
import { getVideos, postVideo } from "./api/api_videos";
import { Button } from "@/components/button";
import { NewVideoType, VideoType } from "@/types/videoType";
import Video from "@/components/video";
import Modal from "@/components/modal";
import TextArea from "@/components/textArea";
import { videoBlank } from "@/utils/constants";
import Input from "@/components/input";

export default function Home() {
  const { videos, setVideos, user, isList, isModal, setIsModal, useMock } =
    useAppContext();
  const [classes, setClasses] = useState("");
  const [video, setVideo] = useState<NewVideoType>(videoBlank);

  useEffect(() => {
    if (!user.userName) return;
    getVideos(user.userName, useMock)
      .then((res) => setVideos(res.videos))
      .catch((err) => console.log(err));
  }, [user.userName, setVideos, useMock]);

  useEffect(() => {
    const newClasses = isList
      ? "w-full flex flex-col overflow-x-hidden"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4";
    setClasses(newClasses);
  }, [isList]);

  const validate = () =>
    !!(video.title && video.video_url && video.description);

  const showModal = () => {
    setIsModal(true);
  };

  const onChange = (key: string, value: string) => {
    setVideo({ ...video, [key]: value });
  };

  const saveVideo = () => {
    if (!validate()) return;
    const newVideo: NewVideoType = { ...video, user_id: user.userName };

    postVideo(newVideo)
      .then((res) => {
        // request a list of new videos, because there is no ID  in the response
        getVideos(user.userName, useMock)
          .then((res) => setVideos(res.videos))
          .catch((err) => console.log(err));
      })
      .finally(() => setVideo(videoBlank));
    setIsModal(false);
  };

  return (
    <section className="relative p-2">
      <h1 className="w-full text-center text-xl m2-4">
        Greetings,{" "}
        <span className="font-bold text-blue-600">{user.userName}</span>
      </h1>
      <h2 className="w-full text-center font text-base mb-4">
        Welcome to the Video Player
      </h2>
      <Button value="Add video" onClick={showModal} />
      <div className={classes}>
        {videos?.map((video: VideoType) => {
          return <Video key={video.id} video={video} />;
        })}
      </div>
      {isModal && (
        <Modal
          close={() => setIsModal(false)}
          save={saveVideo}
          isSaveAllowed={validate()}
        >
          <h3 className="text-base">
            <span className="font-semibold">{user.userName}</span>
            {", "}
            <span>new video will be assigned to you</span>
          </h3>
          <Input
            placeholder="Title"
            onChange={(e) => onChange("title", e.target.value)}
            value={video.title}
          />
          <Input
            placeholder="URL"
            onChange={(e) => onChange("video_url", e.target.value)}
            value={video.video_url}
          />
          <TextArea
            placeholder="Description"
            onChange={(e) => onChange("description", e.target.value)}
            value={video.description}
          />
        </Modal>
      )}
    </section>
  );
}
