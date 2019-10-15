export default async function(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
