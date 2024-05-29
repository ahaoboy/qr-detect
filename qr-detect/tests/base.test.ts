import { expect, test } from "vitest"
import { detect } from "../src"
import { readFileSync } from "node:fs"

test("text", () => {
  const buf = new Uint8Array(readFileSync("./assets/a.webp"))
  const r = detect(buf)
  expect(r).toEqual(["hello world"])
})

test("url", () => {
  const buf = new Uint8Array(readFileSync("./assets/b.webp"))
  const r = detect(buf)
  expect(r).toEqual(["https://qr2clipboard.vercel.app/"])
})

test("text and url", () => {
  const buf = new Uint8Array(readFileSync("./assets/c.webp"))
  const r = detect(buf)
  expect(r).toEqual(["https://qr2clipboard.vercel.app/", "hello world"])
})
