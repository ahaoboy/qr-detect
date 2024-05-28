import { expect, test } from "vitest"
import { detect } from "../src"
import { readFileSync } from "node:fs"

test("base", () => {
  const buf = new Uint8Array(readFileSync("./assets/a.webp"))
  const r = detect(buf)
  expect(r).toEqual(["hello world"])
})
