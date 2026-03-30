'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { info } from '../../info';

import logo from '../../public/logo.png';
import i01 from '../../public/survey/01.jpeg';
// import i02 from '../../public/survey/02.jpeg';
// import i03 from '../../public/survey/03.jpeg';


const Intro = () => <motion.div
  key="intro"
  initial={{opacity: 0}}
  animate={{opacity: 1}}
  exit={{opacity: 0}}
  transition={{duration: 0.5}}
  className="bg-[url('/survey/00.jpeg')] bg-center bg-cover relative flex-grow flex flex-col items-center justify-end px-4 py-12"
>
  <div className="absolute mx-auto inset-x-0 w-[24rem] h-[10rem] top-[4rem] brightness-200">
    <Image src={logo} layout="fill" className="object-contain invert"/>
  </div>

  <div className="absolute bg-gradient-to-t from-black to-transparent bottom-0 h-[60dvh] w-full "/>

  <div className="container flex flex-col justify-center items-center z-10">
    <h1 className="ft-8 text-white font-semibold my-12 text-center [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]">¿Tu negocio está listo para vender Torosano?</h1>
    <p className="ft-4 font-medium text-white text-center [text-shadow:_2px_2px_0_rgb(0_0_0_/_20%)]">100% de Res<br/>Hasta 50% de margen para ti</p>

    <div className="w-full max-w-[50rem] h-12 p-2 mt-16 mb-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{width: '0%'}}
        animate={{width: '100%'}}
        transition={{duration: 3, ease: 'easeInOut'}}
        className="h-full bg-gradient-to-br from-red-900 to-orange-800 rounded-2xl"
      />
    </div>
    <p className="-ft-1 flex items-center text-center text-gray-100">
      Cargando test de Distribuidor
      <span
        className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
    </p>
  </div>
</motion.div>;

const setFormSteps = ({fullName, phone}) => ([
  {
    type: 'radio',
    name: 'owner',
    title: '¿Eres dueño o tomas decisiones de compra?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'si',
        label: 'Si',
      },
      {
        value: 'no',
        label: 'No',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'tipo',
    title: '¿Qué tipo de establecimiento tienes?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'carniceria',
        label: 'Carnicería tradicional',
      },
      {
        value: 'deli-gourmet',
        label: 'Tienda gourmet / delicatessen',
      },
      {
        value: 'mini-cadena',
        label: 'Tienda con varias sucursales',
      },
      {
        value: 'abarrotes',
        label: 'Abarrotes',
      },
      {
        value: 'consumo-propio',
        label: 'Es para consumo propio',
      },
    ],
    cols: 1,
  },
  {
    type: 'select',
    name: 'ubicacion',
    title: '¿En qué zona está tu negocio?',
    description: 'Por el momento solo tenemos distribución en las zonas listadas',
    inputOptions: {required: 'Selecciona una por favor'},
    placeholder: 'Selecciona una por favor',
    options: [
      {value: '', label: '--- INTERIOR ---', disabled: true},
      {value: 'andares', label: 'Andares'},
      {value: 'americana', label: 'Americana'},
      {value: 'arcos-vallarta', label: 'Arcos Vallarta'},
      {value: 'colomos', label: 'Bosque Colomos'},
      {value: 'chapultepec', label: 'Chapultepec'},
      {value: 'ciudad-granja', label: 'Ciudad Granja'},
      {value: 'country', label: 'Country'},
      {value: 'expo', label: 'Expo Guadalajara'},
      {value: 'las-aguilas', label: 'Las Águilas / Ciudad del Sol',},
      {value: 'monraz', label: 'Monraz'},
      {value: 'providencia', label: 'Providencia'},
      {value: 'zapopan-centro', label: 'Zapopan Centro'},
      {value: '', label: '--- NORTE ZMG ---', disabled: true},
      {value: 'la-cima', label: 'La Cima / Valle Imperial'},
      {value: 'san-isidro', label: 'San Isidro / Las Cañadas'},
      {value: 'zona-real', label: 'Zona Real'},
      {value: '', label: '--- SUR ZMG ---', disabled: true},
      {value: 'bugambilias', label: 'Bugambilias',},
      {value: 'santa-anita', label: 'Santa Anita',},
      {value: 'el-palomar', label: 'El Palomar'},
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    autoAdvance: false,
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">Aquí está lo bueno de vender Torosano en tu negocio</p>
        <div className="relative w-full my-8 aspect-video rounded-2xl overflow-hidden">
          <Image src={i01} layout="fill" objectFit="cover"/>
        </div>
        <div className="gap-8 grid grid-cols-1">
          <div className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
            <p className="font-semibold w-[24ch] ft-4 text-center text-white">Ganas entre un 30%–50% de margen por venta</p>
          </div>
          <div className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
            <p className="font-semibold w-[24ch] ft-4 text-center text-white">Puedes empezar con $2,300</p>
          </div>
          <div className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
            <p className="font-semibold w-[24ch] ft-4 text-center text-white">Aumentas tu ticket promedio</p>
          </div>
          <div className="flex items-center justify-center py-8 px-16 rounded-xl bg-orange-800 border-2 border-brand-2 shadow-md">
            <p className="font-semibold w-[24ch] ft-4 text-center text-white">Somos fabricantes dentro de la ZMG</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    type: 'radio',
    name: 'rotacion',
    title: '¿Cuántos clientes atiendes en promedio por día?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: '<30',
        label: 'Menos de 30',
      },
      {
        value: '30-80',
        label: '30 a 80',
      },
      {
        value: '80-150',
        label: '80 a 150',
      },
      {
        value: '>150',
        label: 'Más de 150',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'busqueda',
    title: '¿Buscas productos premium con margen 30–50%?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'si',
        label: 'Si, siempre!',
      },
      {
        value: 'depende',
        label: 'Depende del precio',
      },
      {
        value: 'precio-bajo',
        label: 'Solo si el precio es bajo',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'compromiso',
    title: '¿Estarías dispuesto a probar con pedido mínimo de $2,300?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'si',
        label: 'Si, claro!',
      },
      {
        value: 'consignacion',
        label: 'Solo a consignación',
      },
      {
        value: 'no',
        label: 'No',
      },
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-2',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">7 de cada 10 dueños eligen Torosano como su botana de preferencia</p>
        <div className="mt-12 relative grid grid-cols-1 gap-4 ">
          {Array.from({length: 4}, (_,i) =>
            <div className="relative w-full aspect-square overflow-hidden rounded-3xl">
              <Image
                src={`/survey/testimonio_${String(i + 1).padStart(2, "0")}.jpg`}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          )}
        </div>
      </div>
    ),
  },
  {
    type: 'opt-in',
    title: 'Ok! Ya casi terminamos.',
    description: 'Compárteme tus datos para ponernos de acuerdo y llevar una degustación a tu tienda',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Tu nombre completo',
        inputOptions: {value: fullName, required: 'Cómo te llamas?'},
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'Tu WhatsApp',
        inputOptions: {
          value: phone,
          required: 'Cuál es tu WhatsApp?',
          maxLength: {value: 10, message: 'Tu tel a 10 digitos'},
          minLength: {value: 10, message: 'Tu tel a 10 digitos'},
        },
      },
    ],
  },
]);

export default function Survey({lead, utm}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);

  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
  } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  useEffect(() => {
    const current = formSteps[formStep];

    if (current.autoAdvance) {
      const timer = setTimeout(() => {
        setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStep]);
  useEffect(() => {
    const step = formSteps[formStep];

    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
      console.log(step?.name);
    }
  }, [formStep]);

  let formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone});

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);
  const handleNext = async () => {
    const currentStep = formSteps[formStep];
    const values = getValues();

    console.log(values);

    if (values?.tipo === 'consumo-propio') {
      await router.push('/consumo-propio');
    }

    if (currentStep.name === 'user') {
      formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone, user: watch('user')});
    }

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const valid = await methods.trigger(currentStep.name);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };
  const onSubmit = async (data) => {
    setSending(true);
    try {
      data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');

      const payload = {...lead, ...data, ...utm};

      const url = info.surveyWebhook;

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fbEvent(
        'Lead',
        {phone: data.phone, externalID: res.id},
      );

      setCookie('lead', {...data, id: res.id});

      await router.push('/results');

    } catch (err) {
      console.error('Error al enviar formulario:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro/>
          )}
          {!showIntro && !showOutro && (
            <motion.div
              key="survey"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
              className="flex flex-col flex-grow pb-[8rem]"
            >
              <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
                <div className="relative bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
                </div>
              </div>
              <div
                className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
                <div className="survey-card">
                  <FormProvider {...methods}>
                    <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={formStep} // importante para animaciones entre pasos
                          initial={{opacity: 0, x: 100}}
                          animate={{opacity: 1, x: 0}}
                          exit={{opacity: 0, x: -100}}
                          transition={{duration: 0.4, ease: 'easeInOut'}}
                        >
                          <StepRenderer
                            step={formSteps[formStep]}
                            index={formStep}
                            currentStep={formStep}
                            errors={errors}
                            inputError={inputError}
                            errorMessage={errors[formSteps[formStep]?.name]?.message}
                            register={register}
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div
                        className={`fixed p-8 bottom-0 inset-x-0 grid ${formSteps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                        {formSteps[formStep].type !== 'checkpoint' &&
                          <button
                            type="button"
                            onClick={() => setFormStep(formStep - 1)}
                            className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                            disabled={formStep <= 0}
                          >Atrás
                          </button>
                        }
                        <button
                          type="button"
                          disabled={sending}
                          onClick={() => {
                            if (formStep === lastInputIndex) {
                              handleSubmit(onSubmit)();
                            } else {
                              handleNext();
                            }
                          }}
                          className="mt-auto !w-full"
                        >
                          {sending && <span className="animate-spin mr-4">+</span>}
                          {formStep === lastInputIndex || formSteps[formStep].type === 'checkpoint' ? 'Continuar' : 'Siguiente'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req, query } = ctx;
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

  // --- Revisar params UTM del query ---
  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  // Si hay params en la URL, se usan; si no, cae en cookie
  const utm =
    Object.keys(utmFromQuery).length > 0
      ? utmFromQuery
      : cookies.utm ?? null;

  const { lead } = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone: lead?.phone ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm,
    },
  };
}
