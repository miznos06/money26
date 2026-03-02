import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/microcms";

export default function Category() {
  const { slug } = useParams(); // invest など
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .get({
        endpoint: "posts",
        queries: {
          filters: `category.slug[equals]${slug}`,
        },
      })
      .then((res) => setPosts(res.contents));
  }, [slug]);

  return (
    <div>
      <h1>{slug} の記事一覧</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      ))}
    </div>
  );
}