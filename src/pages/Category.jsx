import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/microcms";

export default function Category() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .get({
        endpoint: "posts",
        queries: {
          filters: `category[equals]${slug}`,
        },
      })
      .then((res) => setPosts(res.contents));
  }, [slug]);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>{slug} の記事一覧</h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <Link to={`/posts/${post.id}`}>続きを読む</Link>
        </div>
      ))}
    </div>
  );
}