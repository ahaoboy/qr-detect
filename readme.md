Recognize the QR code from the image
[qr2clipboard](https://qr2clipboard.vercel.app/)

```ts
  const buf = new Uint8Array(readFileSync('./assets/a.webp'));
  const r = detect(buf)
  expect(r).toEqual(['hello world'])
```