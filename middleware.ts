import { auth } from "@/auth"

export default auth((req) => {
// Redirect to login page if not authenticated
  if (!req.auth && req.nextUrl.pathname === "/dashboard") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

// Redirect to dashboard if authenticated
  if (req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
    // Dont use middleware for these paths
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }