"use server";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type ActionStateKI = {
  success: boolean;
  message: string;
};

export async function subscribeActionKI(
  prevState: ActionStateKI,
  formData: FormData,
): Promise<ActionStateKI> {
  await delay(2000); // Simuliert Netzwerk-Verzögerung

  const email = formData.get("email") as string;

  if (!email || email.trim() === "") {
    return { success: false, message: "Bitte gib eine E-Mail-Adresse ein." };
  }

  if (email === "error@test.com") {
    return { success: false, message: "Diese E-Mail-Adresse ist gesperrt!" };
  }

  return { success: true, message: "Erfolgreich angemeldet!" };
}
