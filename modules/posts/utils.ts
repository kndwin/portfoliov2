import { graphql } from "@octokit/graphql";
import { Repository } from "@octokit/graphql-schema";
import type { PostDisplay } from "./types";

const request = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getPosts = async () => {
  const data = await request<{ repository: Repository }>(`query {
    repository(name: "${process.env.GITHUB_REPO}", owner: "${process.env.GITHUB_USERNAME}") {
			issues(first:50) {
				nodes {
					title
					number
					createdAt
					body
					labels(first:5) {
						edges {
							node {
								name
							}
						}
					}
				}
			}
    }
  }
`);
  const postDisplays: PostDisplay[] =
    data?.repository?.issues?.nodes?.map((issue) => ({
      body: issue?.body,
      createdAt: issue?.createdAt,
      id: issue?.number,
      title: issue?.title,
      labels:
        issue?.labels?.edges?.map((label) => label?.node?.name as string) ?? [],
    })) ?? [];

  return postDisplays;
};

export const getPost = async (number: number) => {
  const data = await request<{ repository: Repository }>(
    `query getPost($number: Int!){
			repository(name: "${process.env.GITHUB_REPO}", owner: "${process.env.GITHUB_USERNAME}") {
        issue(number: $number) {
            title
            number
            createdAt
						body
        }
      }
		}`,
    { number: Number(number) }
  );
  return data.repository.issue;
};
