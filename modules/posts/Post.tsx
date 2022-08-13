import { useRouter } from "next/router";
import { Box, Text, IconButton } from "common/ui";
import { styled } from "stitches.config";
import { PostMarkdown } from "modules/posts/PostMarkdown";
import { PostDisplay } from "./types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButtonDarkMode } from "modules/home/Settings";

export type PostProps = {
  post: PostDisplay;
};

export const Post = (props: PostProps) => {
  return (
    <StyledPage>
      <StyledHeader>
        <IconButtonBackHome />
        <IconButtonDarkMode />
      </StyledHeader>
			<StyledPostTitle as="h1" size="9" css={{ fw: 900, mt: "$3", mb: "$6" }}>
        {props.post.title as string}
      </StyledPostTitle>
      <PostMarkdown content={props.post.body as string} />
    </StyledPage>
  );
};

const IconButtonBackHome = () => {
  const router = useRouter();
  const onIconClick = () => router.push("/");
  return (
    <IconButton onClick={onIconClick}>
      <ArrowLeftIcon />
    </IconButton>
  );
};

const StyledHeader = styled(Box, {
  d: "flex",
  jc: "space-between",
});

const StyledPostTitle = styled(Text, {
  background: "linear-gradient(120deg, $plum6, $gold8)",
  backgroundClip: "text",
  textFillColor: "transparent",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
});

const StyledPage = styled(Box, {
  maw: "70ch",
  w: "100%",
  d: "flex",
  fd: "column",
  mx: "auto",
  p: "$3",
});
