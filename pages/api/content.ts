
import type { NextApiRequest, NextApiResponse } from 'next';

const POSTS = ['about', 'contact'] as const;
type PostName = typeof POSTS[number];
export type PostNameMap = { [postName in PostName]: string };

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BLOG_ID = '2761611771015880407';
const POST_ID_MAP: PostNameMap = {
  about: '3162161490130975536',
  contact: '7440665883149726166'
}

function getBloggerPostEndpoint(post: PostName) {
  return `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID_MAP[post]}?key=${GOOGLE_API_KEY}`
}

type ResponseData = PostNameMap;

export async function fetchBlogPost(post: PostName) {
  try {
    const response = await fetch(getBloggerPostEndpoint(post), {
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
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const [about, contact] = await Promise.all([fetchBlogPost('about'), fetchBlogPost('contact')]);

  res.status(200).json({
    about, contact
  });
}
