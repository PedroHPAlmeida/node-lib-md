export default async function validateLinks(arr_links) {
  const links = extractLinks(arr_links);
  const status = await checkStatus(links);
  return arr_links.map((l, index) => ({ ...l, status: status[index] }));
}

async function checkStatus(urls) {
  return await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      } catch (error) {
        return handleError(error);
      }
    })
  );
}

function handleError(error) {
  if (error.cause.code === "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Error desconhecido";
  }
}

function extractLinks(array) {
  return array.map((e) => Object.values(e)[0]);
}
