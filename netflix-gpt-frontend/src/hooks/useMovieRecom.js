async function getMovieRecs(query) {
  const resp = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(t);
  }

  const data = await resp.json();
  return data.choices?.[0]?.message?.content;
}
export default getMovieRecs;
