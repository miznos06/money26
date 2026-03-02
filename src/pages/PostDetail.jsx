import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../lib/microcms";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client.get({
      endpoint: "posts",
      contentId: id,
    }).then((res) => {
      setPost(res);
    });
  }, [id]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | 資産形成の実践`;
    }
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </div>
  );
}