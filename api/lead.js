// Recebe o lead da landing page e encaminha para o seu CRM (Kommo, Make, Zapier, n8n, Google Sheets...).
// Configure na Vercel: Settings > Environment Variables > WEBHOOK_URL = (URL do webhook do seu CRM)
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const lead = req.body || {};
  const url = process.env.WEBHOOK_URL;
  if (!url) {
    console.log("Lead recebido (WEBHOOK_URL não configurado):", JSON.stringify(lead));
    return res.status(200).json({ ok: true, forwarded: false });
  }
  try {
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    return res.status(200).json({ ok: true, forwarded: true });
  } catch (e) {
    console.error("Falha ao enviar lead:", e);
    return res.status(200).json({ ok: true, forwarded: false });
  }
}
