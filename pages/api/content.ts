
import type { NextApiRequest, NextApiResponse } from 'next';

const POSTS = ['about', 'events', 'contact'] as const;
export type PostName = typeof POSTS[number];
type PostNameMap = { [postName in PostName]: string };

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BLOG_ID = '2761611771015880407';
const POST_ID_MAP: PostNameMap = {
  about: '3162161490130975536',
  contact: '7440665883149726166',
  events: '7812858365204062827'
}

function getBloggerPostEndpoint(postName: PostName) {
  return `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID_MAP[postName]}?key=${GOOGLE_API_KEY}`
}

type ResponseData = string;

export async function fetchBloggerPost(postName: PostName): Promise<string> {
  try {
    const response = await fetch(getBloggerPostEndpoint(postName), {
      method: 'GET',
    });
    const responseData = await response.json();
    if (responseData.error) {
      throw responseData.error.message;
    }
    return responseData.content;
  } catch (e) {
    console.error('Error fetching Blogger API: ', e)
  }
  return '';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const sectionName = req.query['section'] as PostName;
  const sectionContent = await fetchBloggerPost(sectionName);
  res.status(200).json(sectionContent);
}