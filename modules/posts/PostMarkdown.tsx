import ReactMarkdown from "react-markdown";

import { Box, Text } from "common/ui";
import { styled } from "stitches.config";

export type PostMarkdownProps = {
  content: string;
};

export const PostMarkdown = (props: PostMarkdownProps) => {
  return (
    <ReactMarkdown
      children={props.content}
      components={{
        h1: (node) => (
					<Text size="7" css={{ fw: "bold", mb: "$3", mt: "$2" }}>
            {node.children}
          </Text>
        ),
        h2: (node) => (
          <Text size="6" css={{ fw: "bold", mb: "$2", mt: "$1" }}>
            {node.children}
          </Text>
        ),
        h3: (node) => (
          <Text size="6" css={{ fw: "bold" }}>
            {node.children}
          </Text>
        ),
        h4: (node) => (
          <Text size="5" css={{ fw: "bold" }}>
            {node.children}
          </Text>
        ),
        h5: (node) => (
          <Text size="5" css={{ fw: "bold" }}>
            {node.children}
          </Text>
        ),
        h6: (node) => (
          <Text size="4" css={{ fw: "bold" }}>
            {node.children}
          </Text>
        ),
        p: (node) => (
					<Text size="4" css={{ lh: "1.2em", mt: "$4" }}>
            {node.children}
          </Text>
        ),
        li: (node) => (
					<Text as="li" size="4" css={{ d: "list-item", lh: "1.2em" }}>
            {node.children}
          </Text>
        ),
        ul: (node) => (
          <Box as="ul" css={{ my: "$1", ml: "$1", pl: "$3" }}>
            {node.children}
          </Box>
        ),
        ol: (node) => (
          <Box as="ol" css={{ my: "$1", ml: "$1", pl: "$3" }}>
            {node.children}
          </Box>
        ),
        img: (node) => <StyledImage src={node.src} alt={node.alt} />,
      }}
    />
  );
};

const StyledImage = styled("img", {
  w: "100%",
  h: "100%",
  objectFit: "contain",
  border: "2px solid $slate3",
  br: "$3",
});
