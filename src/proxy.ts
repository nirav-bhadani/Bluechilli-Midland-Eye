import { NextResponse, type NextRequest } from "next/server";

/**
 * Legacy WordPress URLs: ?page_id=<n> consultant profile links 301 to the
 * consultants page (anchors unknown per id — plain page redirect).
 */
export function proxy(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get("page_id");
  if (pageId) {
    const url = request.nextUrl.clone();
    url.pathname = "/consultants-and-specialist-page";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|downloads|favicon.ico).*)"],
};
