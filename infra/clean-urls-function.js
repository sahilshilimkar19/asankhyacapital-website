// CloudFront Function (viewer-request, cloudfront-js-2.0) — clean URLs.
//
//   /about        -> serves /about.html (URI rewrite; address bar unchanged)
//   /about/       -> same as /about
//   /about.html   -> 301 /about   (one canonical URL per page)
//   /index.html   -> 301 /
//   /             -> untouched (Default Root Object)
//   /assets/x.js, /favicon.svg, /sitemap.xml, ... -> untouched
//
// The 403/404 -> /404.html custom error mapping is origin-side and does
// not pass through this function, so error behavior is unchanged.

function redirect(location) {
  return {
    statusCode: 301,
    statusMessage: 'Moved Permanently',
    headers: { location: { value: location } },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === '/' || uri === '') {
    return request;
  }
  if (uri === '/index.html') {
    return redirect('/');
  }
  if (uri.endsWith('.html')) {
    return redirect(uri.slice(0, -5));
  }

  // Normalize trailing slashes: /about/ -> /about
  var clean = uri;
  while (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  if (clean === '/' || clean === '') {
    return request;
  }

  var lastSegment = clean.split('/').pop();
  if (lastSegment.indexOf('.') === -1) {
    request.uri = clean + '.html';
  } else if (clean !== uri) {
    request.uri = clean;
  }
  return request;
}
