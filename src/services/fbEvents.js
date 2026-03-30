export default function fbEvent(
  eventName,
  userData = {},
  eventID,
  clientData = {}
) {
  const standardEvents = new Set([
    'PageView',
    'Purchase',
    'Lead',
    'Contact',
    'InitiateCheckout',
  ]);

  const isStandard = standardEvents.has(eventName);

  // Conviene enviar string y reutilizar exactamente el mismo ID en Pixel + backend
  const resolvedEventID =
    eventID ??
    (typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()));

  const normalizedUser = {
    ph: userData.phone || '',
    em: userData.email || '',
    external_id: userData.externalID || '',
  };

  try {
    if (typeof fbq === 'function') {
      if (isStandard) {
        fbq('track', eventName, clientData, { eventID: resolvedEventID });
      } else {
        fbq('trackCustom', eventName, clientData, { eventID: resolvedEventID });
      }
    }
  } catch (err) {
    console.error('fbq error:', err);
  }

  const payload = {
    eventName,
    eventID: resolvedEventID,
    user: normalizedUser,
    clientData,
  };

  return fetch('/api/fb-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`fb-event request failed: ${res.status} ${text}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error('fb-event fetch error:', err);
      return {
        ok: false,
        eventID: resolvedEventID,
        error: err.message,
      };
    });
}