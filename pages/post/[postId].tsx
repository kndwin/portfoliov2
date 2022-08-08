import { GetStaticProps } from "next";
import { getPosts, getPost } from "modules/posts/utils";
import type { PostDisplay } from "modules/posts/types";
import { Post } from 'modules/posts/Post'

export type PostProps = {
  post: PostDisplay;
};

export default function PostPage(props: PostProps) {
	return <Post post={props.post} />
}

export async function getStaticPaths() {
  const posts: PostDisplay[] = await getPosts();
  const paths = posts.map((post) => ({ params: { postId: `${post.id}` } }));
  console.log({ paths: JSON.stringify(paths, null, 2) });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = Number(ctx.params?.postId);
  const post = await getPost(id);
	console.log({ post: JSON.stringify(post, null, 2) })
  return { props: { post } };
};
