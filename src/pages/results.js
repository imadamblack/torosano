import Image from 'next/image';
import Blockbuster from '../components/blockbuster';
import Faqs from '../components/faqs';
import { info } from '../../info';

import i02 from '../../public/survey/02.jpeg';
import i03 from '../../public/survey/03.jpeg';
import i04 from '../../public/survey/04.jpeg';
import i05 from '../../public/survey/05.jpeg';
import fbEvent from '../services/fbEvents';

export default function Results({lead}) {
  const {fullName} = lead;
  const firstName = fullName.split(' ')[0];

  const SectionCTA = () => <div className="w-full space-y-4 mt-20">
    <hr className="mb-8"/>
    <p className="ft-4 text-center font-semibold">Programa una degustación y cotiza tu primer pedido</p>
    <a
      href={`https://wa.me/${info.whatsapp.value}`}
      onClick={() => fbEvent('Contact')}
      target="_blank"
      className="button !w-full"
    >
      Mándanos un WhatsApp
    </a>
  </div>;

  return (
    <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
      <div
        className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
        <div className="survey-card border-b pb-12">
          <div className="flex flex-col w-full py-12">
            <h1 className="text-center mb-8"><span className="font-semibold">{firstName ?? 'Hey'}</span>, dale a tu mostrador un producto que sí rota
              y sí deja margen!
            </h1>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8">
              <Image src={i02} layout="fill" objectFit="cover" objectPosition="top"/>
            </div>
            <div className="container grid grid-cols-1">
              <p className="ft-2">
                <b>Torosano</b> es carne deshidratada premium diseñada para minoristas que quieren:<br/>
                — Margen real (30%–50%)<br/>
                — Sabor consistente<br/>
                — Reorden constante<br/>
                — Y cero improvisación en calidad
              </p>
            </div>
          </div>

          <SectionCTA />

        </div>
      </div>

      <Blockbuster
        overhead="Testimonios"
        title="Confía en quienes ya venden"
        background={i05}
        imgPos="object-bottom"
      />

      <section className="container mb-20">
        <div className={`relative flex-grow`}>
          <div className="mt-12 relative grid grid-cols-1 md:grid-cols-4 gap-4 ">
            {Array.from({length: 4}, (_, i) =>
              <div className="relative w-full aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={`/survey/testimonio_${String(i + 1).padStart(2, '0')}.jpg`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>,
            )}
          </div>
        </div>
        <SectionCTA/>
      </section>

      <Blockbuster
        overhead="Beneficios"
        title="Aquí está lo bueno de vender Torosano en tu negocio"
        background={i03}
        imgPos='object-bottom'
      />

      <section className="container my-20">
        <div className={`relative flex-grow`}>
          <div className="gap-8 grid grid-cols-1">
            <div
              className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
              <p className="font-semibold w-[24ch] ft-4 text-center text-white">Ganas entre un 30%–50% de margen por
                venta</p>
            </div>
            <div
              className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
              <p className="font-semibold w-[24ch] ft-4 text-center text-white">Puedes empezar con $2,300</p>
            </div>
            <div
              className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
              <p className="font-semibold w-[24ch] ft-4 text-center text-white">Aumentas tu ticket promedio</p>
            </div>
            <div
              className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
              <p className="font-semibold w-[24ch] ft-4 text-center text-white">Somos fabricantes dentro de la ZMG</p>
            </div>
          </div>
        </div>
        <SectionCTA/>
      </section>

      <Blockbuster
        overhead="FAQs"
        title="¿Tienes dudas? probablemente estén aquí"
        background={i04}
        imgPos="object-bottom"
      />

      <section className="container my-20">
        <Faqs/>
        <SectionCTA/>
      </section>

    </div>
  );
}

export async function getServerSideProps(ctx) {
  const {req} = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];

    if (!raw) continue;

    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  const {lead, utm} = cookies;

  // if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/',
  //     },
  //   };
  // }

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone: lead?.phone ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm: utm ?? null,
    },
  };
}