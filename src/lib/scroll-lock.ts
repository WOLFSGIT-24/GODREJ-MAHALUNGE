// Locks page scrolling (popup, mobile menu) without moving the page.
// body is height:100% here, so overflow:hidden on it collapses the document and
// jumps to the top; pinning body with position:fixed keeps the visible section.

let locks = 0;
let savedY = 0;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  savedY = window.scrollY;
  const body = document.body.style;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  body.position = 'fixed';
  body.top = `-${savedY}px`;
  body.left = '0';
  body.right = '0';
  body.width = '100%';
  if (scrollbar > 0) body.paddingRight = `${scrollbar}px`; // no layout shift on desktop
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  const body = document.body.style;
  body.position = '';
  body.top = '';
  body.left = '';
  body.right = '';
  body.width = '';
  body.paddingRight = '';
  // html has scroll-behavior:smooth; restore instantly so the page doesn't glide back.
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, savedY);
  html.style.scrollBehavior = prev;
}
