export async function testExpressServer() {
  const response = await fetch("/api/test");
  return await response.json();
}
