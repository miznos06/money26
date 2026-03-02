import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../lib/microcms";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client.get({ endpoint: "posts" }).then((res) => {
      setPosts(res.contents);
    });

    client.get({ endpoint: "categories" }).then((res) => {
      setCategories(res.contents);
    });
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>資産形成の実践</h1>

      <h2>カテゴリ一覧</h2>
      {categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: "10px" }}>
          <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
        </div>
      ))}

      <hr style={{ margin: "40px 0" }} />

      <h2>最新記事</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <Link to={`/posts/${post.id}`}>続きを読む</Link>
        </div>
      ))}
    </div>
  );
}