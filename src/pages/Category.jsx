import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/microcms";

export default function Category() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const categoryMap = {
      house: "住宅",
      saving: "節約",
      invest: "投資",
    };
  
  const categoryName = categoryMap[slug] || slug;

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

  useEffect(() => {
    document.title = `${categoryName}の記事一覧 | 資産形成の実践`;

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `${categoryName}カテゴリの記事一覧ページです。資産形成に役立つ情報をまとめています。`
      );
    }
  }, [categoryName]);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>{categoryName}   の記事一覧</h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <Link to={`/posts/${post.id}`}>続きを読む</Link>
        </div>
      ))}
    </div>
  );
}