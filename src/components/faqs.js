import { useState } from 'react';

export default function Faqs() {
  const [faqOpen, setFaqOpen] = useState(0);

  const questions = [
    {
      q: "¿Cuánto puedo ganar?",
      a: "Margen sugerido entre 30%–50%."
    },
    {
      q: "¿Cada cuánto resurtido?",
      a: "Normalmente cada 15–30 días según rotación."
    },
    {
      q: "¿Consignación?",
      a: "Se evalúa según perfil y volumen."
    },
    {
      q: "¿Pedido mínimo?",
      a: "$2,300 MXN."
    },
    {
      q: "¿Puedo probar antes?",
      a: "Sí. Se agenda degustación con el responsable del negocio."
    }
  ];


  return (
    <section className='py-12'>
      <div className='container'>
        {questions.map((q, i) =>
          <div key={`faq-${i}`} className="w-full shadow-sm mb-2">
            <p
              id={i}
              className="w-full p-4 font-bold bg-white mb-0 cursor-pointer rounded-lg border border-gray-200"
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className="font-bold mr-4 text-brand-1">›</span>{q.q}
            </p>
            <p className={`${faqOpen == i ? 'flex' : 'hidden'} bg-gray-50 p-12`}>
              {q.a}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}