
import type { NextApiRequest, NextApiResponse } from 'next';
import { SUBTITLE, TITLE_FULL } from '../../content/metadata';

const POSTS = ['about', 'events', 'contact'] as const;
type PostName = typeof POSTS[number];
type PostNameMap = { [postName in PostName]: string };

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BLOG_ID = '2761611771015880407';
const POST_ID_MAP: PostNameMap = {
  about: '3162161490130975536',
  contact: '7440665883149726166',
  events: '7812858365204062827'
}
const BLOGGER_ENDPOINT = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}?key=${GOOGLE_API_KEY}`

function getBloggerPostEndpoint(post: PostName) {
  return `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${POST_ID_MAP[post]}?key=${GOOGLE_API_KEY}`
}

type Meta = {
  name: string;
  description: string;
}

export type SiteContent = PostNameMap & Meta;

async function fetchBlogPost(post: PostName): Promise<string> {
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

async function fetchBlog(): Promise<Meta> {
  try {
    const response = await fetch(BLOGGER_ENDPOINT, {
      method: 'GET',
    });
    const responseData = await response.json();
    if (responseData.error) {
      throw responseData.error.message;
    }
    return {
      name: responseData.name,
      description: responseData.description
    };
  } catch (e) {
    console.error('Error fetching Blogger API: ', e)
  }
  return {
    name: TITLE_FULL,
    description: SUBTITLE
  };
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const [meta, about, events, contact] = await Promise.all([
    fetchBlog(),
    fetchBlogPost('about'),
    fetchBlogPost('events'),
    fetchBlogPost('contact')
  ]);

  return {
    ...meta,
    about,
    events,
    contact,
  };
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<SiteContent>
) {
  const [meta, about, events, contact] = await Promise.all([
    fetchBlog(),
    fetchBlogPost('about'),
    fetchBlogPost('events'),
    fetchBlogPost('contact')
  ]);

  res.status(200).json({
    ...meta,
    about,
    events,
    contact,
  });
}
