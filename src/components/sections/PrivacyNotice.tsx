import { business } from '../../data/business';

// Aviso corto según la Ley 8968 (Protección de la Persona frente al Tratamiento de sus Datos Personales).
export const PrivacyNotice = () => (
  <details className="group text-xs text-muted">
    <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1 underline-offset-4 hover:text-ink hover:underline">
      Aviso de privacidad
    </summary>
    <div className="mt-3 grid max-w-2xl gap-2 leading-relaxed">
      <p>
        Este sitio no usa cookies propias, no tiene formularios y no guarda datos personales. Tampoco usa herramientas de
        analítica.
      </p>
      <p>
        Si nos escribís por WhatsApp, tus datos (nombre, número y mensaje) los recibe {business.name} solo para coordinar tu
        cita o tu pedido, y se manejan dentro de WhatsApp según sus propias políticas. No los compartimos con terceros.
      </p>
      <p>
        El mapa de Google solo se carga si tocás “Mostrar mapa”. Al hacerlo, Google puede guardar cookies según su política
        de privacidad.
      </p>
      <p>
        Para consultar, corregir o pedir que borremos tus datos, escribinos al WhatsApp {business.whatsappDisplay} (Ley
        8968).
      </p>
    </div>
  </details>
);
