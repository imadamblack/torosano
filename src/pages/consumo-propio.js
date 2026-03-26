import Image from 'next/image';
import i01 from '../../public/survey/01.jpeg';
import i02 from '../../public/survey/02.jpeg';
import fbEvent from '../services/fbEvents';

export default function ConsumoPropio() {
  return (
    <div className="container py-8">
      <h1 className="text-center">Te invitamos a que pruebes alguno de nuestros dos sabores</h1>
      <p className="ft-2 text-center">Compra en MercadoLibre con envío gratis</p>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <a
          className="relative w-full"
          href="https://www.mercadolibre.com.mx/torosano-carne-seca-artesanal-habanero-empaque-premium-180g/up/MLMU920740072"
          onClick={() => fbEvent('Outbound MercadoLibre')}
        >
          <div className="relative w-full my-8 aspect-video rounded-2xl overflow-hidden">
            <Image src={i01} layout="fill" objectFit="cover"/>
          </div>
          <p className="!w-full button">
            Compra sabor Habanero aquí
          </p>
        </a>
        <a
          className="relative w-full"
          href="https://www.mercadolibre.com.mx/torosano-carne-seca-artesanal-sallimon-empaque-premium-180g/up/MLMU917215199"
          onClick={() => fbEvent('Outbound MercadoLibre')}
        >
          <div className="relative w-full my-8 aspect-video rounded-2xl overflow-hidden">
            <Image src={i02} layout="fill" objectFit="cover"/>
          </div>
          <p className="!w-full button">
            Compra sabor Limón aquí
          </p>
        </a>
      </div>
    </div>
  );
}