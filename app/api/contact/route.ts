import { NextResponse } from "next/server";
import { siteData } from "@/lib/data";

const resendApiUrl = "https://api.resend.com/emails";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Completa todos los campos." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Ingresa un correo valido." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar RESEND_API_KEY en el servidor." },
        { status: 500 },
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || siteData.personal.email;
    const from = process.env.CONTACT_FROM_EMAIL;

    const resendResponse = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Nuevo mensaje de ${name}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          "",
          "Mensaje:",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend error:", errorText);

      return NextResponse.json(
        { error: "No se pudo enviar el mensaje en este momento." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Ocurrio un error inesperado al enviar el mensaje." },
      { status: 500 },
    );
  }
}
