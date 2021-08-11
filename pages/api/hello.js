/**
 * @octowl
 *
 * Remove this file if you don't intend to have any local apis
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function helloAPI(req, res) {
  res.status(200).json({ name: "John Doe" });
}
