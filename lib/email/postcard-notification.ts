import "server-only";

type PostcardNotification = { id: string; authorName: string; countryName: string; groupName: string; message: string };

export async function notifyPostcardSubmission(postcard: PostcardNotification): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.POSTCARD_NOTIFICATION_EMAIL ?? "lestath@escultista.org";
  const sender = process.env.POSTCARD_FROM_EMAIL;
  if (!apiKey || !sender) {
    console.warn("Postal recibida sin correo: configura RESEND_API_KEY y POSTCARD_FROM_EMAIL para notificar al administrador.");
    return { sent: false, reason: "email_provider_not_configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: `Nueva postal de ${postcard.authorName} · ${postcard.countryName}`,
      text: `Hay una nueva postal pendiente de aprobación.\n\nAutor: ${postcard.authorName}\nPaís: ${postcard.countryName}\nGrupo: ${postcard.groupName}\nMensaje: ${postcard.message}\n\nID: ${postcard.id}`,
    }),
  });
  if (!response.ok) {
    console.error("Resend rechazó el aviso de postal", await response.text());
    return { sent: false, reason: "email_provider_error" };
  }
  return { sent: true };
}
