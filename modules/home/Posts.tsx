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
        {posts.map((p: PostDisplay) => (
          <StyledPostItem
            key={`item-${p.id}`}
            onClick={() => onPostOpen({ id: p.id as number })}
          >
            {p.title}
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
      console.log({ post });
    };

    const onLinkClick = () => {
      router.push(`/post/${post.id}`);
    };

    return (
      <StyledPostBorder
        as={isFullscreen ? "div" : motion.div}
        drag={!isFullscreen}
        style={isFullscreen ? fullscreenCss : normalScreenCss}
        dragMomentum={false}
				dragConstraints={ref as RefObject<HTMLElement>}
      >
        <StyledPostHeader>
          <StyledPostTitle b size="6">
            {post.title}
          </StyledPostTitle>

          <Box css={{ d: "flex", gap: "$3", ai: "center" }}>
            <IconButton onClick={onLinkClick}>
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
            <StyledPost>
              <Box css={{ mx: "auto", maw: "70em" }}>
                <PostMarkdown content={post.body as string} />
              </Box>
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
  width: "calc(100vw - 2em)",
  maxWidth: "calc(100vw - 2em)",
  height: "calc(100vh - 2em)",
  maxHeight: "calc(100vh - 2em)",
  position: "fixed",
  top: "1em",
  left: "1em",
  transform: "none",
};

const normalScreenCss = {
  left: "calc(50% - 35ch)",
  top: "calc(50% - 10vh)",
};

const fullscreenCssScroll = {
  width: "calc(100vw - 2em - 4px)",
  maxWidth: "calc(100vw - 2em - 4px)",
  height: "calc(100vh - 2em - 3em)",
  maxHeight: "calc(100vh - 2em - 3em)",
};

const normalScreenCssScroll = {
  width: "calc(70ch - 4px)",
  height: "calc(80vh - 3em)",
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
  p: "$3",
  d: "flex",
  fd: "column",
  gap: "$2",
  zIndex: "2",
  background: "$slate2",
  br: "$2",
});

const StyledPostBorder = styled(motion.div, {
  position: "fixed",
  background: "$lgIcon",
  p: "3px",
  zIndex: "1",
  br: "$3",
  left: "calc(50% - 35ch)",
  top: "10vh",
  maw: "70ch",
  mah: "80vh",
  h: "fit-content",
  w: "calc(100% - 2 * $3)",
  overflowY: "hidden",
});

const StyledPostItem = styled(
  (props: any) => (
    <Box {...props}>
      <Text>{props.children}</Text>
    </Box>
  ),
  {
    background: "$plum1",
    cursor: "pointer",
    backgroundImage: "$plum1",
    br: "$2",
    p: "$3",
    d: "flex",
    gap: "$2",
    maw: "45ch",
    w: "100%",
    transition: "all .1s ease",
    "&:hover": {
      background: "$gold3",
    },
  }
);
