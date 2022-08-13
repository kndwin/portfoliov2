import { GetStaticProps } from "next";
import { getPosts, getPost } from "modules/posts/utils";
import type { PostDisplay } from "modules/posts/types";
import { Post } from "modules/posts/Post";

export type PostProps = {
  post: PostDisplay;
};

export default function PostPage(props: PostProps) {
  return <Post post={props.post} />;
}

export async function getStaticPaths() {
  const posts: PostDisplay[] = await getPosts();
  const paths = posts
    .filter((post) => post?.labels?.includes("published"))
    .map((post) => ({ params: { postId: `${post.id}` } }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = Number(ctx.params?.postId);
  const post = await getPost(id);
  return { props: { post }, revalidate: 60 * 60 * 3 };
};
