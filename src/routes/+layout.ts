// Every page is pre-rendered to plain HTML, and every URL ends in a slash
// (/lessons/5/ is lessons/5/index.html), so any static server can host the build.
export const prerender = true;
export const trailingSlash = 'always';
