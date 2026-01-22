module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.end("Method Not Allowed");
  }

  const zRaw = Array.isArray(req.query?.z) ? req.query.z[0] : req.query?.z;
  let z = Number.parseInt(zRaw ?? "50", 10);
  if (!Number.isFinite(z)) z = 50;

  const ts = Date.now().toString();
  let out = "";
  for (let i = 0; i < ts.length; i++) {
    const digit = ts.charCodeAt(i) - 48;
    const code = digit + 1 + 2 * z;
    out += String.fromCharCode(code);
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.end(out);
};
