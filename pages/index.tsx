import { useRef, forwardRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import { styled } from "stitches.config";
import { Box } from "common/ui";

import { getPosts, getPost } from "modules/posts/utils";
import type { PostDisplay } from 'modules/posts/types'
import { CanvasFaceModel } from "modules/home/Canvas";
import { Settings } from "modules/home/Settings";
import { Posts } from "modules/home/Posts";

type HomeProps = {
	posts: PostDisplay[]
}

export default function Home({ posts }: HomeProps) {

  const constraintRef = useRef(null);

  return (
    <StyledPage>
      <Head>
        <title>kndwin</title>
      </Head>
      <CanvasFaceModel />
      <Overlay ref={constraintRef}>
        <Settings />
        <Posts posts={posts} ref={constraintRef} />
      </Overlay>
    </StyledPage>
  );
}

const StyledPage = styled(Box, {
  h: "100%",
  mih: "100vh",
  d: "flex",
  fd: "column",
});

const Overlay = styled(
  forwardRef((props: any, ref) => (
    <Box ref={ref} {...props}>
      {props.children}
    </Box>
  )),
  {
    position: "fixed",
    zIndex: 1,
    width: "100vw",
    height: "100vh",
    display: "flex",
    p: "$3",
    gap: "$3",
  }
);

export async function getStaticProps() {
	const posts: PostDisplay[] = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
