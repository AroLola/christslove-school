export default function handler(req: import('express').Request, res: import('express').Response) {
  const { getSecret } = require('#airo/secrets');
  let apiKey = getSecret('GOOGLE_MAPS_API_KEY');

  // OVERRIDE: If the system returns a placeholder or empty value, force a bypass string
  if (!apiKey || apiKey === '_placeholder' || apiKey === 'deployed') {
    apiKey = 'temporary_unlocked_value'; 
  }

  return res.json({ apiKey });
}
