import { forwardRef, useState } from "react";
import { BookmarkIcon, Cross1Icon, Link2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

import { styled } from "stitches.config";
import { Box, IconButton, Text } from "common/ui";

import { StyledIconButton, StyledContent } from "./common";
import { PostMarkdown } from "modules/posts/PostMarkdown";
import type { PostDisplay } from "modules/posts/types";

import * as Popover from "common/ui/overlay/Popover/Popover";
import * as ScrollArea from "common/ui/overlay/ScrollArea/ScrollArea";

export type PostsProps = {
  posts: PostDisplay[];
};

export const Posts = forwardRef<HTMLDivElement>(
  ({ posts }: PostsProps, ref) => {
    const [openPost, setOpenPost] = useState(
      posts.map(({ id }: PostDisplay) => ({ [id]: false }))
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
          {posts.map((p: Post) => (
            <StyledPostItem
              key={`item-${p.id}`}
              onClick={() => onPostOpen({ id: p.id })}
            >
              {p.title}
            </StyledPostItem>
          ))}
        </StyledContent>
        {posts.map(
          (p: Post) =>
            Boolean(openPost[p.id]) && (
              <PostContent
                key={`post-${p.id}`}
                ref={ref}
                post={p}
                onClose={() => onPostClose({ id: p.id })}
              />
            )
        )}
      </Popover.Root>
    );
  }
);

type PostContentProps = {
  onClose: () => void;
  post: PostDisplay;
};

const PostContent = forwardRef<HTMLDivElement>(
  ({ onClose, post }: PostContentProps, ref) => {
    const onLinkClick = () => {
      console.log({ post });
    };

    return (
      <StyledPostBorder drag dragConstraints={ref}>
        <StyledPostHeader>
          <StyledPostTitle b size="6">
            {post.title}
          </StyledPostTitle>

          <Box css={{ d: "flex", gap: "$3", ai: "center" }}>
            <IconButton onClick={onLinkClick}>
              <Link2Icon />
            </IconButton>

            <IconButton onClick={onClose}>
              <Cross1Icon />
            </IconButton>
          </Box>
        </StyledPostHeader>
        <ScrollArea.Root css={{ width: "70ch", height: "80vh" }}>
          <ScrollArea.Viewport>
            <StyledPost>
              <PostMarkdown>{post.body}</PostMarkdown>
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
  top: "50%",
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
