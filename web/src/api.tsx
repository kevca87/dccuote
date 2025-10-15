const baseUrl = "http://127.0.0.1:5000";


// Generic GET utility
export async function apiFetch(endpoint: string, options = {}) : Promise<any> {
  const url = `${baseUrl}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  };

  try {
    const res = await fetch(url, defaultOptions);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API error: ${res.status} ${errorText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
}

export async function apiPost(endpoint: string, data: any) : Promise<any> {
    return apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
    });
}