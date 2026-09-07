export const contact = {
  whatsapp: "5511977152219",
  email: "jeffinho.je8@gmail.com",
  linkedin: "https://www.linkedin.com/in/jefferson-lopes-silva",
  github: "https://github.com/JLopes2024",
};

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}