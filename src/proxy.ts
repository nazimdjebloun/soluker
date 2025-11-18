import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Matcher for admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If it's an admin route, protect it
  if (isAdminRoute(req)) {
    // for simple auth check:
    await auth.protect();
  }


});

export const config = {
  matcher: [
    // this is the default matcher from Clerk docs: protect all non-_next/static/asset routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)", // if you want to consider API / trpc routes
  ],
};
