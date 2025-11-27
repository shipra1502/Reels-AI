export async function gptMoviesApi(query) {
  const resp = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${resp.status}`);
  }

  const data = await resp.json();
  return data; // { success:true, message: "...", usage: {...} }
}

export default gptMoviesApi;
