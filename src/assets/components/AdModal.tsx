import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController, XCircle, } from 'phosphor-react';
import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
}

export function AdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    useEffect(() => {
        axios('http://localhost:3333/games/').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleAdModal(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name) {

        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error);
            alert('Por favor, insira valores válidos para criar o anúncio!')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#271c44] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50">
                <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio</Dialog.Title>

                <form onSubmit={handleAdModal} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select
                            name="game"
                            id="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500"
                            defaultValue=""
                        >
                            <option disabled selected value="">Selecione o game que deseja jogar</option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Noob ou Pro?" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name="discord" id="discord" type="string" placeholder="Usuário#0000" />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                type="multiple"
                                className="flex gap-2 mt-2 mb-4"
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    title="Domingo"
                                    className={`w-12 h-8 rounded ${weekDays.includes('0') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Dom
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    title="Segunda"
                                    className={`w-12 h-8 rounded ${weekDays.includes('1') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Seg
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    title="Terça"
                                    className={`w-12 h-8 rounded ${weekDays.includes('2') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Ter
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    title="Quarta"
                                    className={`w-12 h-8 rounded ${weekDays.includes('3') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Qua
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    title="Quinta"
                                    className={`w-12 h-8 rounded ${weekDays.includes('4') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Qui
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    title="Sexta"
                                    className={`w-12 h-8 rounded ${weekDays.includes('5') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Sex
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    title="Sábado"
                                    className={`w-12 h-8 rounded ${weekDays.includes('6') ? 'bg-[#141026]' : 'bg-zinc-500'}`}
                                >
                                    Sab
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horario do dia?</label>
                            <div className="grid grid-cols-3 gap-4 appearance-none" >
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.CheckboxIndicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.CheckboxIndicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-center gap-4 ">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-zinc-600"
                        >
                            <XCircle className="w-6 h-6" />
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-[#141026] px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-[#37295e]"
                        >
                            <GameController className="w-6 h-6" />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}