import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { AdBanner } from './assets/components/AdBanner';
import { AdModal } from './assets/components/AdModal';
import axios from 'axios';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { GameBanner } from './assets/components/Gamebanner';

import './styles/main.css';

import logoImg from './assets/logo-nlw-ignite.svg';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 280px)": {
          slides: { perView: 2.0, spacing: 4 },
        },
        "(min-width: 320px)": {
          slides: { perView: 2.5, spacing: 6 },
        },
        "(min-width: 480px)": {
          slides: { perView: 3.0, spacing: 8 },
        },
        "(min-width: 600px)": {
          slides: { perView: 3.5, spacing: 10 },
        },
        "(min-width: 800px)": {
          slides: { perView: 4.0, spacing: 12 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 5.0, spacing: 14 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 5.5, spacing: 16 },
        },
      },
      mode: "free-snap",
      slides: { origin: "center", perView: 5.5, spacing: 16},

    }
  );

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto px-4 sm:px-8 md:px-10 flex items-center flex-col my-10 mb-20">
      <img className="w-48 sm:w-64 md:w-80 lg:w-96" src={logoImg} alt="" />

      <h1 className=" text-2xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl my-10 md:my-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      {/* GAME LIST */}
    
      {games.length > 0 &&
        <div ref={sliderRef} className="keen-slider px-4">
          {games.map(game => {
            return (
              <div key={game.id} className="keen-slider__slide">
                <GameBanner
                  key={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              </div>
            )
          })}
        </div>
      }

      <Dialog.Root>
        <AdBanner />

        <AdModal />
      </Dialog.Root>
    </div>
  )
}

export default App