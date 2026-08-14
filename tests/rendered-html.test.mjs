import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the nail salon concept selector", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Nail Salon Website Concepts<\/title>/i);
  assert.match(html, /Choose a direction/);
  assert.match(html, /The Edit/);
  assert.match(html, /Pop Studio/);
  assert.match(html, /Slow Beauty/);
  assert.match(html, /Book an appointment/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("keeps all three client directions in the interactive showcase", async () => {
  const [showcase, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/showcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(showcase, /id: "editorial"/);
  assert.match(showcase, /id: "bold"/);
  assert.match(showcase, /id: "warm"/);
  assert.match(showcase, /aria-pressed/);
  assert.match(css, /\.theme-bold/);
  assert.match(css, /\.theme-warm/);
  assert.match(css, /@media\(max-width:520px\)/);
  assert.match(layout, /Nail Salon Website Concepts/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
