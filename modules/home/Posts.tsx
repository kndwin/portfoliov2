import { forwardRef, useState, RefObject } from "react";
import {
  BookmarkIcon,
  Cross1Icon,
  Link2Icon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";

import { styled } from "stitches.config";
import { Box, IconButton, Text } from "common/ui";

import { StyledIconButton, StyledContent } from "./common";
import { PostMarkdown } from "modules/posts/PostMarkdown";
import type { PostDisplay } from "modules/posts/types";

import * as Popover from "common/ui/overlay/Popover/Popover";
import * as ScrollArea from "common/ui/overlay/ScrollArea/ScrollArea";
import { useRouter } from "next/router";

export type PostsProps = {
  posts: PostDisplay[];
};

export const Posts = forwardRef<HTMLElement, PostsProps>(({ posts }, ref) => {
  const [openPost, setOpenPost] = useState<Record<number, boolean>>(
    posts.reduce((prev, curr) => ({ ...prev, [curr.id as number]: false }), {})
  );

  const onPostOpen = ({ id }: { id: number }) => {
    setOpenPost((prev) => ({ ...prev, [id]: true }));
  };

  const onPostClose = ({ id }: { id: number }) => {
    setOpenPost((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <StyledIconButton>
          <BookmarkIcon />
        </StyledIconButton>
      </Popover.Trigger>
      <StyledContent>
        {posts.map((post: PostDisplay) => (
          <StyledPostItem
            key={`item-${post.id}`}
            onClick={() => onPostOpen({ id: post.id as number })}
          >
            <StyledTag>
              {new Date(`${post?.createdAt}`).toLocaleDateString()}
            </StyledTag>
            <Text>{post.title}</Text>
          </StyledPostItem>
        ))}
      </StyledContent>
      {posts.map((post: PostDisplay) => {
        const id = post.id as number;
        if (Boolean(openPost[id])) {
          return (
            <PostContent
              key={`post-${id}`}
              post={post}
              onClose={() => onPostClose({ id })}
              ref={ref}
            />
          );
        }
      })}
    </Popover.Root>
  );
});

type PostContentProps = {
  onClose: () => void;
  post: PostDisplay;
};

const PostContent = forwardRef<HTMLElement, PostContentProps>(
  ({ onClose, post }, ref) => {
    const router = useRouter();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const onToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };

    const postDate = new Date(`${post?.createdAt}`);

    return (
      <StyledPostBorder
        as={isFullscreen ? "div" : motion.div}
        drag={!isFullscreen}
        css={isFullscreen ? fullscreenCss : normalScreenCss}
        dragMomentum={false}
        dragConstraints={ref as RefObject<HTMLElement>}
      >
        <StyledPostHeader>
          <StyledTag>{postDate.toLocaleDateString()}</StyledTag>
          <StyledPostTitle b size="6">
            {post.title}
          </StyledPostTitle>

          <Box css={{ d: "flex", gap: "$3", ai: "center" }}>
            <IconButton as="a" href={`/post/${post.id}`} target="_blank">
              <Link2Icon />
            </IconButton>

            <IconButton onClick={onToggleFullscreen}>
              {isFullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
            </IconButton>

            <IconButton onClick={onClose}>
              <Cross1Icon />
            </IconButton>
          </Box>
        </StyledPostHeader>
        <ScrollArea.Root
          style={isFullscreen ? fullscreenCssScroll : normalScreenCssScroll}
        >
          <ScrollArea.Viewport>
            <StyledPost css={{ maw: isFullscreen ? "60em" : "" }}>
              <PostMarkdown content={post.body as string} />
            </StyledPost>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </StyledPostBorder>
    );
  }
);

const fullscreenCss = {
  width: "100%",
  maxWidth: "calc(100vw - 2em)",
  height: "100%",
  maxHeight: "calc(100vh - 2em)",
  top: "1em",
  left: "1em",
  transform: "none",
  pb: "50px",
};

const normalScreenCss = {
  h: "100%",
  mah: "80vh",
  w: "calc(100% - 2 * $3)",
  left: "calc(50% - 35ch)",
  top: "5em",
  pb: "50px",
};

const fullscreenCssScroll = {
  width: "calc(100vw - 2em - 4px)",
  maxWidth: "calc(100vw - 2em - 4px)",
  height: "100%",
  maxHeight: "calc(100vh - 5em)",
};

const normalScreenCssScroll = {
  height: "100%",
  maxHeight: "100%",
};
const StyledPostTitle = styled(Text, {
  background: "linear-gradient(120deg, $plum10, $gold11)",
  backgroundClip: "text",
  textFillColor: "transparent",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
});

const StyledPostHeader = styled(Box, {
  d: "flex",
  ai: "center",
  jc: "space-between",
  py: "$2",
  px: "$1",
  w: "100%",
});

const StyledPost = styled(Box, {
  pt: "$5",
  py: "$3",
  px: "$5",
  d: "flex",
  fd: "column",
  gap: "$2",
  zIndex: "2",
  background: "$slate2",
  br: "$2",
  mx: "auto",
  h: "100%",
});

const StyledPostBorder = styled(motion.div, {
  position: "fixed",
  background: "$lgIcon",
  p: "3px",
  zIndex: "1",
  br: "$3",
  top: "10vh",
  maw: "70ch",
  mah: "80vh",
  overflowY: "hidden",
});

const StyledPostItem = styled(Box, {
  background: "$plum1",
  cursor: "pointer",
  backgroundImage: "$plum1",
	d: "flex",
	ai: "center", 
  br: "$2",
  p: "$3",
  gap: "$2",
  maw: "45ch",
  w: "100%",
  transition: "all .1s ease",
  "&:hover": {
    background: "$gold3",
  },
});

const StyledTag = styled(Text, {
  py: "$1",
  px: "$2",
  bc: "$slate1",
  br: "$2",
});
