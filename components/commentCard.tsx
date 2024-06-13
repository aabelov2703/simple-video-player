import { normalizeDateTime } from "@/utils";

interface CommentCardProps {
  comment: CommentType;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { user_id, created_at, content } = comment;

  return (
    <article className="mb-1 py-1">
      <div className="w-full bg-m-hover p-1">
        <span className="font-semibold italic pr-2">{user_id}</span>
        <span className="text-xs">[{normalizeDateTime(created_at)}]</span>
      </div>
      <p className="bg-m-contrast p-1 text-sm">{content}</p>
    </article>
  );
};

export default CommentCard;
