#!/usr/bin/env python3
"""로컬 서버와 GitHub Pages용 정적 파일 조립."""

from __future__ import annotations

import argparse
import shutil
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
PAGES = ROOT / "src" / "pages"
DIST = ROOT / "dist"
PORT = 8080

OLD_HTML = {
    "about",
    "blog",
    "consult",
    "consulting",
    "gijang",
    "pantax",
    "refund",
    "review",
}


def clean_path(raw: str) -> str:
    path = unquote(urlsplit(raw).path)
    if len(path) > 1:
        path = path.rstrip("/")
    return path or "/"


def resolve(path: str) -> Path | tuple[str, str]:
    if path == "/":
        return PAGES / "index.html"

    name = path.lstrip("/")
    if name.endswith(".html"):
        stem = name[:-5]
        if stem in OLD_HTML:
            return ("redirect", f"/{stem}/")
        if stem == "index":
            return ("redirect", "/")

    page = PAGES / name / "index.html"
    if page.is_file():
        return page

    if name == "404.html":
        return PAGES / "404.html"

    if name.startswith("assets/") or name.startswith("src/css/") or name.startswith("src/js/"):
        candidate = ROOT / name
        if candidate.is_file():
            return candidate

    return PAGES / "404.html"


def assemble(dest: Path = DIST) -> None:
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)

    shutil.copy2(PAGES / "index.html", dest / "index.html")
    shutil.copy2(PAGES / "404.html", dest / "404.html")

    for name in OLD_HTML:
        shutil.copytree(PAGES / name, dest / name)
        (dest / f"{name}.html").write_text(
            f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/{name}/">
  <link rel="canonical" href="/{name}/">
  <title>판기세무회계</title>
  <script>location.replace("/{name}/" + location.search + location.hash);</script>
</head>
<body></body>
</html>
""",
            encoding="utf-8",
        )

    shutil.copytree(ROOT / "assets", dest / "assets")
    (dest / "src").mkdir()
    shutil.copytree(ROOT / "src" / "css", dest / "src" / "css")
    shutil.copytree(ROOT / "src" / "js", dest / "src" / "js")
    print(f"assembled {dest}")


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        mapped = resolve(clean_path(path))
        if isinstance(mapped, tuple):
            return str(PAGES / "404.html")
        return str(mapped)

    def send_head(self):
        mapped = resolve(clean_path(self.path))
        if isinstance(mapped, tuple):
            loc = mapped[1]
            query = urlsplit(self.path).query
            if query:
                loc = f"{loc}?{query}"
            self.send_response(301)
            self.send_header("Location", loc)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return None
        if mapped == PAGES / "404.html" and clean_path(self.path) not in {"/404", "/404.html"}:
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            data = mapped.read_bytes()
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return None
        return super().send_head()

    def log_message(self, fmt: str, *args) -> None:
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def serve(port: int) -> None:
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"http://127.0.0.1:{port}/")
    httpd.serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--build", action="store_true")
    parser.add_argument("--port", type=int, default=PORT)
    args = parser.parse_args()
    if args.build:
        assemble()
    else:
        serve(args.port)
