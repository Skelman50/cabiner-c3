export const pinMessage = ({ timer, pinStatus, pinType }) => {
  if (pinStatus === "No Send" && timer !== 0) {
    return `PIN уже відправлено! Наступний можно отримати через ${timer} секунд.`;
  }
  if (pinStatus === "No Send" && timer === 0) {
    return `Отримайте новий PIN`;
  }
  if (pinType === "telegram" && pinStatus === "Send") {
    return `Щойно на Ваш акаунт у Telegram було відправлене повідомлення з PIN-кодом. Будь-ласка, введіть отриманий код та натисніть кнопку "Надіслати"!`;
  }
  if (pinType !== "telegram" && pinStatus === "Send") {
    return `Щойно на Ваш мобільний телефон було відправлене повідомлення з PIN-кодом. Будь-ласка, введіть отриманий код та натисніть кнопку "Надіслати"!`;
  }
};
