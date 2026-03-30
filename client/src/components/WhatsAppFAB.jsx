import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function WhatsAppFAB() {
  return (
    <a
      id="wa-fab"
      href="https://wa.me/923000000000?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-white text-2xl" />
    </a>
  );
}
