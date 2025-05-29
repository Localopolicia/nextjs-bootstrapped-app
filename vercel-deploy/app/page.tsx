"use client";

import React, { useState, useEffect } from 'react';

interface Upgrade {
  id: number;
  name: string;
  cost: number;
  bonus: number;
  purchased: boolean;
  description: string;
  autoClick?: boolean;
  cursorEffect?: string;
  gifEffect?: string;
  soundEffect?: boolean;
  waveEffect?: boolean;
}

const initialUpgrades: Upgrade[] = [
  {
    id: 50,
    name: 'Cursor Mágico Hawaiano 🌺',
    cost: 100,
    bonus: 2,
    purchased: false,
    description: 'Transforma tu cursor en una flor hawaiana mágica.',
    cursorEffect: 'flower'
  },
  {
    id: 51,
    name: 'Cursor Surfista 🏄‍♂️',
    cost: 200,
    bonus: 3,
    purchased: false,
    description: 'Tu cursor se convierte en una tabla de surf.',
    cursorEffect: 'surf'
  },
  {
    id: 52,
    name: 'Stitch Bailarín 💃',
    cost: 300,
    bonus: 4,
    purchased: false,
    description: '¡Stitch baila de alegría!',
    gifEffect: 'stitch1'
  },
  {
    id: 53,
    name: 'Stitch Travieso 😈',
    cost: 400,
    bonus: 5,
    purchased: false,
    description: 'Stitch hace de las suyas.',
    gifEffect: 'stitch2'
  },
  {
    id: 54,
    name: 'Melodía del Ukelele 🎸',
    cost: 500,
    bonus: 6,
    purchased: false,
    description: '¡Toca una melodía hawaiana!',
    soundEffect: true
  },
  {
    id: 55,
    name: 'Ola Gigante 🌊',
    cost: 600,
    bonus: 7,
    purchased: false,
    description: '¡Una ola gigante inunda la pantalla!',
    waveEffect: true
  },
  { 
    id: 1, 
    name: 'Chispa Hawaiana ✨', 
    cost: 10, 
    bonus: 1, 
    purchased: false,
    description: 'Duplica temporalmente tus clics durante 10 segundos.'
  },
  { 
    id: 2, 
    name: 'Brisa Mística 🌊', 
    cost: 50, 
    bonus: 2, 
    purchased: false,
    description: 'Genera un recurso automático cada 5 segundos.',
    autoClick: true
  },
  { 
    id: 3, 
    name: 'Ola de Aloha 🏄‍♂️', 
    cost: 150, 
    bonus: 3, 
    purchased: false,
    description: 'Reduce los tiempos de espera en un 10% durante un minuto.'
  },
  { 
    id: 4, 
    name: 'Luau de Luces 🔥', 
    cost: 300, 
    bonus: 4, 
    purchased: false,
    description: 'Desbloquea un minijuego de luces interactivas que otorga bonificaciones extra.'
  },
  { 
    id: 5, 
    name: 'Cascada Tropical 💦', 
    cost: 600, 
    bonus: 5, 
    purchased: false,
    description: 'Activa un pulso de clics automático que se suma a tu multiplicador.',
    autoClick: true
  },
  { 
    id: 6, 
    name: 'Llama Danza 🔥', 
    cost: 1000, 
    bonus: 6, 
    purchased: false,
    description: 'Los clics generan una onda expansiva que multiplica recursos.'
  },
  { 
    id: 7, 
    name: 'Eco del Volcán 🌋', 
    cost: 2000, 
    bonus: 8, 
    purchased: false,
    description: 'Cada clic tiene una probabilidad de causar una erupción de bonificación.'
  },
  { 
    id: 8, 
    name: 'Neblina Mágica 🌫️', 
    cost: 3000, 
    bonus: 10, 
    purchased: false,
    description: 'Aumenta temporalmente todos los efectos de potenciadores activos.'
  },
  { 
    id: 9, 
    name: 'Rayo de Coco 🥥', 
    cost: 5000, 
    bonus: 12, 
    purchased: false,
    description: 'Dispara cocos automáticamente que generan recursos extra.',
    autoClick: true
  },
  { 
    id: 10, 
    name: 'Pasos Ligeros 👣', 
    cost: 7500, 
    bonus: 15, 
    purchased: false,
    description: 'Reduce el tiempo entre clics automáticos.'
  },
  { 
    id: 11, 
    name: 'Tesoro Escondido 💎', 
    cost: 10000, 
    bonus: 18, 
    purchased: false,
    description: 'Desentierra tesoros que otorgan bonificaciones aleatorias.'
  },
  { 
    id: 12, 
    name: 'Viento de Fortuna 🌪️', 
    cost: 15000, 
    bonus: 20, 
    purchased: false,
    description: 'Crea torbellinos que recolectan recursos cercanos.'
  },
  { 
    id: 13, 
    name: 'Isla Encantada 🏝️', 
    cost: 20000, 
    bonus: 25, 
    purchased: false,
    description: 'Genera una isla mística que produce recursos pasivamente.',
    autoClick: true
  },
  { 
    id: 14, 
    name: 'Fuerza Hex 🔮', 
    cost: 30000, 
    bonus: 30, 
    purchased: false,
    description: 'Maldice a los enemigos para obtener más recursos.'
  },
  { 
    id: 15, 
    name: 'Amanecer Radiante ☀️', 
    cost: 40000, 
    bonus: 35, 
    purchased: false,
    description: 'El poder del sol aumenta todas las ganancias durante el día.'
  },
  { 
    id: 16, 
    name: 'Ritual Tikki 🗿', 
    cost: 50000, 
    bonus: 40, 
    purchased: false,
    description: 'Invoca espíritus ancestrales que multiplican recursos.'
  },
  { 
    id: 17, 
    name: 'Danza de la Luna 🌙', 
    cost: 75000, 
    bonus: 45, 
    purchased: false,
    description: 'Aumenta el poder durante la noche con magia lunar.'
  },
  { 
    id: 18, 
    name: 'Festín Tropical 🍍', 
    cost: 100000, 
    bonus: 50, 
    purchased: false,
    description: 'Organiza un festín que atrae a criaturas que generan recursos.',
    autoClick: true
  },
  { 
    id: 19, 
    name: 'Melodía del Mar 🎵', 
    cost: 150000, 
    bonus: 60, 
    purchased: false,
    description: 'Las sirenas cantan para multiplicar tus ganancias.'
  },
  { 
    id: 20, 
    name: 'Espíritu del Surf 🏄‍♀️', 
    cost: 200000, 
    bonus: 70, 
    purchased: false,
    description: 'Cabalga las olas para recolectar recursos marinos.'
  },
  { 
    id: 21, 
    name: 'Tornado de Flores 🌺', 
    cost: 250000, 
    bonus: 80, 
    purchased: false,
    description: 'Crea un torbellino de flores que multiplica recursos cercanos.'
  },
  { 
    id: 22, 
    name: 'Bendición Tiki 🎭', 
    cost: 300000, 
    bonus: 90, 
    purchased: false,
    description: 'Los dioses tiki bendicen tus clics con poder ancestral.'
  },
  { 
    id: 23, 
    name: 'Arcoíris Mágico 🌈', 
    cost: 400000, 
    bonus: 100, 
    purchased: false,
    description: 'Conecta islas con arcoíris que generan recursos.'
  },
  { 
    id: 24, 
    name: 'Fuego Fatuo 👻', 
    cost: 500000, 
    bonus: 120, 
    purchased: false,
    description: 'Espíritus juguetones que aumentan las ganancias nocturnas.'
  },
  { 
    id: 25, 
    name: 'Tsunami de Poder 🌊', 
    cost: 600000, 
    bonus: 150, 
    purchased: false,
    description: 'Desata un tsunami que arrastra tesoros a la orilla.'
  },
  { 
    id: 26, 
    name: 'Danza del Volcán 🌋', 
    cost: 700000, 
    bonus: 180, 
    purchased: false,
    description: 'Ritual que despierta el poder del volcán dormido.'
  },
  { 
    id: 27, 
    name: 'Cristales Místicos 💎', 
    cost: 800000, 
    bonus: 200, 
    purchased: false,
    description: 'Amplifica el poder de todos los potenciadores activos.'
  },
  { 
    id: 28, 
    name: 'Tótem Guardián 🗿', 
    cost: 900000, 
    bonus: 250, 
    purchased: false,
    description: 'Protege y multiplica tus recursos pasivamente.',
    autoClick: true
  },
  { 
    id: 29, 
    name: 'Lluvia de Estrellas ⭐', 
    cost: 1000000, 
    bonus: 300, 
    purchased: false,
    description: 'Las estrellas caen otorgando deseos y recursos.'
  },
  { 
    id: 30, 
    name: 'Portal Dimensional 🌀', 
    cost: 1200000, 
    bonus: 350, 
    purchased: false,
    description: 'Abre portales a dimensiones ricas en recursos.'
  },
  { 
    id: 31, 
    name: 'Ofrenda Ancestral 🏺', 
    cost: 1500000, 
    bonus: 400, 
    purchased: false,
    description: 'Los ancestros bendicen tus clics con poder sagrado.'
  },
  { 
    id: 32, 
    name: 'Jardín Encantado 🌸', 
    cost: 1800000, 
    bonus: 450, 
    purchased: false,
    description: 'Cultiva plantas mágicas que generan recursos.',
    autoClick: true
  },
  { 
    id: 33, 
    name: 'Eclipse Místico 🌓', 
    cost: 2000000, 
    bonus: 500, 
    purchased: false,
    description: 'Combina el poder del sol y la luna.'
  },
  { 
    id: 34, 
    name: 'Pergamino Antiguo 📜', 
    cost: 2500000, 
    bonus: 600, 
    purchased: false,
    description: 'Contiene hechizos que aumentan tu poder.'
  },
  { 
    id: 35, 
    name: 'Cetro de Coral 🌊', 
    cost: 3000000, 
    bonus: 700, 
    purchased: false,
    description: 'Controla las mareas para obtener tesoros marinos.'
  },
  { 
    id: 36, 
    name: 'Amuleto Tikki 🔮', 
    cost: 3500000, 
    bonus: 800, 
    purchased: false,
    description: 'Amplifica todos los efectos mágicos activos.'
  },
  { 
    id: 37, 
    name: 'Espejo Dimensional 🪞', 
    cost: 4000000, 
    bonus: 900, 
    purchased: false,
    description: 'Refleja y duplica el poder de otros potenciadores.'
  },
  { 
    id: 38, 
    name: 'Reloj de Arena ⌛', 
    cost: 5000000, 
    bonus: 1000, 
    purchased: false,
    description: 'Manipula el tiempo para obtener más recursos.'
  },
  { 
    id: 39, 
    name: 'Piedra Filosofal 💠', 
    cost: 6000000, 
    bonus: 1200, 
    purchased: false,
    description: 'Transmuta recursos básicos en superiores.'
  },
  { 
    id: 40, 
    name: 'Orbe del Océano 🌊', 
    cost: 7000000, 
    bonus: 1400, 
    purchased: false,
    description: 'Controla las corrientes marinas para multiplicar recursos.'
  },
  { 
    id: 41, 
    name: 'Corona Solar 👑', 
    cost: 8000000, 
    bonus: 1600, 
    purchased: false,
    description: 'Canaliza el poder del sol para aumentar ganancias.'
  },
  { 
    id: 42, 
    name: 'Báculo Lunar 🌙', 
    cost: 9000000, 
    bonus: 1800, 
    purchased: false,
    description: 'Invoca el poder de la luna para multiplicar recursos.'
  },
  { 
    id: 43, 
    name: 'Collar de Perlas 📿', 
    cost: 10000000, 
    bonus: 2000, 
    purchased: false,
    description: 'Cada perla amplifica el poder de tus clics.'
  },
  { 
    id: 44, 
    name: 'Tambor Tribal 🥁', 
    cost: 12000000, 
    bonus: 2500, 
    purchased: false,
    description: 'Su ritmo invoca espíritus que generan recursos.',
    autoClick: true
  },
  { 
    id: 45, 
    name: 'Cristal del Tiempo ⚡', 
    cost: 15000000, 
    bonus: 3000, 
    purchased: false,
    description: 'Acelera la producción de todos los recursos.'
  },
  { 
    id: 46, 
    name: 'Esencia de Fénix 🔥', 
    cost: 20000000, 
    bonus: 4000, 
    purchased: false,
    description: 'Renace con más poder cada vez que se activa.'
  },
  { 
    id: 47, 
    name: 'Lágrima de Sirena 💧', 
    cost: 25000000, 
    bonus: 5000, 
    purchased: false,
    description: 'Purifica y potencia todos los efectos mágicos.'
  },
  { 
    id: 48, 
    name: 'Corazón de Volcán 🌋', 
    cost: 30000000, 
    bonus: 6000, 
    purchased: false,
    description: 'Desata el poder primordial de la tierra.'
  },
  { 
    id: 49, 
    name: 'Llave del Paraíso 🗝️', 
    cost: 50000000, 
    bonus: 8000, 
    purchased: false,
    description: 'Abre las puertas a recursos ilimitados.'
  },
  { 
    id: 1000000, 
    name: 'El Último Aloha: Poder del Infinito 🌈', 
    cost: 1000000000, 
    bonus: 9999, 
    purchased: false,
    description: 'El poder definitivo que transforma cada clic en una explosión de recursos infinitos. Este legendario potenciador combina la esencia de todos los poderes hawaianos en uno solo. Al activarlo, desatas una cascada interminable de bendiciones, convirtiendo la isla en un paraíso de abundancia eterna. ¡El máximo poder hawaiano!'
  }
];

export default function Home() {
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [clickEffect, setClickEffect] = useState(false);
  const [cursorStyle, setCursorStyle] = useState<string>('default');
  const [showGif, setShowGif] = useState<string | null>(null);
  const [showWave, setShowWave] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [audio] = useState<HTMLAudioElement | null>(typeof window !== 'undefined' ? new Audio('https://www.myinstants.com/media/sounds/tinasong.mp3') : null);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (cursorStyle !== 'default') {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updateCursorPosition(e));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorStyle]);

  const handleClick = () => {
    setScore(prev => prev + multiplier);
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 100);
  };

  const handlePurchase = (upgrade: Upgrade) => {
    if (score >= upgrade.cost) {
      setScore(prev => prev - upgrade.cost);
      setMultiplier(prev => prev + upgrade.bonus);
      setUpgrades(prev =>
        prev.map(u =>
          u.id === upgrade.id ? { ...u, purchased: true } : u
        )
      );

      // Aplicar efectos especiales según el tipo de mejora
      if (upgrade.cursorEffect) {
        setCursorStyle(upgrade.cursorEffect);
      }
      if (upgrade.gifEffect) {
        setShowGif(upgrade.gifEffect);
        setTimeout(() => setShowGif(null), 3000);
      }
      if (upgrade.soundEffect && audio) {
        audio.play();
      }
      if (upgrade.waveEffect) {
        setShowWave(true);
        setTimeout(() => setShowWave(false), 3000);
      }

      setEventMessage(`¡Has comprado ${upgrade.name}! Tu poder ha aumentado.`);
      setTimeout(() => setEventMessage(null), 3000);
    }
  };

  useEffect(() => {
    const autoClickUpgrades = upgrades.filter(u => u.autoClick && u.purchased);
    let interval: NodeJS.Timeout;

    if (autoClickUpgrades.length > 0) {
      interval = setInterval(() => {
        setScore(prev => prev + (autoClickUpgrades.length * multiplier));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [upgrades, multiplier]);

  useEffect(() => {
    if (score > 0 && score % 1000 === 0) {
      setEventMessage("¡Aloha! ¡Has alcanzado un nuevo hito hawaiano! 🌺");
      setTimeout(() => setEventMessage(null), 3000);
    }
  }, [score]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sour+Gummy&display=swap" rel="stylesheet" />
      <main 
        className="min-h-screen w-full relative overflow-hidden flex flex-col"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-2 py-4 flex-1">
          <header className="text-center mb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
              Stitch's Hawaiian Clicker 🏖️
            </h1>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-xl">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Puntos: {formatNumber(score)}
              </p>
              <p className="text-2xl text-blue-500 mt-2">
                Multiplicador: {multiplier}x
              </p>
            </div>
          </header>

          <div className="flex justify-center mb-6">
            <div 
              onClick={handleClick}
              className={`w-[24rem] h-[24rem] cursor-pointer transition-transform duration-200 ${
                clickEffect ? 'scale-95' : 'scale-100'
              } hover:scale-105`}
            >
              <img 
                src="https://i.pinimg.com/originals/ff/c4/27/ffc42772e6ff5af1e9f4d48205b0c038.png"
                alt="Stitch - Haz clic para ganar puntos"
                className="w-full h-full object-contain drop-shadow-xl"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-2 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 max-w-full mx-auto bg-black/40 p-3 rounded-xl backdrop-blur-sm">
            {upgrades.map((upgrade) => (
              <div 
                key={upgrade.id} 
                className={`bg-white/95 backdrop-blur-sm p-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl border-2 min-h-[90px] flex flex-col justify-between text-sm ${
                  score >= upgrade.cost ? 'border-blue-400/50 cursor-pointer hover:bg-blue-50/95' : 'border-white/20'
                }`}
                onClick={() => score >= upgrade.cost && handlePurchase(upgrade)}
              >
                <h3 className="text-sm font-bold mb-0.5 text-blue-600 truncate">{upgrade.name}</h3>
                <p className="text-xs text-gray-600 mb-0.5 line-clamp-2">{upgrade.description}</p>
                <div className="flex justify-between items-center gap-1">
                  <p className="text-base font-semibold text-purple-600 whitespace-nowrap">
                    {formatNumber(upgrade.cost)} 💎
                  </p>
                  <p className="text-lg text-blue-500 whitespace-nowrap">
                    +{upgrade.bonus} {upgrade.autoClick ? '/seg' : '✨'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efectos especiales */}
        <style jsx global>{`
          body {
            cursor: ${cursorStyle === 'default' ? 'auto' : 'none'};
          }
          #cursor-follow {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            font-size: 24px;
            transform: translate(-50%, -50%);
            display: ${cursorStyle === 'default' ? 'none' : 'block'};
          }
        `}</style>
        
        <div 
          id="cursor-follow" 
          style={{ 
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
            transform: `translate(-50%, -50%) scale(${clickEffect ? 0.8 : 1})`
          }}
        >
          {cursorStyle === 'flower' ? '🌺' : cursorStyle === 'surf' ? '🏄‍♂️' : ''}
        </div>

        {showGif && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="relative">
              <img 
              src={showGif === 'stitch1' ? 'https://i.pinimg.com/originals/78/67/c6/7867c6788d671c7f673873790ec8c5ee.gif' :
                   showGif === 'stitch2' ? 'https://www.icegif.com/wp-content/uploads/2023/08/icegif-588.gif' : ''}
                alt="Efecto especial"
                className="max-w-md w-full h-auto animate-bounce"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                }}
              />
            </div>
          </div>
        )}

        {showWave && (
          <div className="fixed inset-0 z-50 pointer-events-none animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent mix-blend-overlay"></div>
            <img 
              src="https://usagif.com/wp-content/uploads/2022/hqgif/ocean-wave-70-transparent-background-active-wave.gif"
              alt="Ola"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.2) contrast(1.1)'
              }}
            />
          </div>
        )}

        {eventMessage && (
          <div className="fixed bottom-4 right-4 max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border-2 border-white/20 transform animate-fade-in">
            <p className="text-xl font-medium text-blue-600">{eventMessage}</p>
          </div>
        )}
      </main>
    </>
  );
}
