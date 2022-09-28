import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function AdBanner() {
    return (
        <div className="pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg ">
            <div className="bg-[#271c44] px-8 py-6 flex justify-between items-start flex-col md:flex-row md:items-center">
                <div className="pb-2 md:pb-0">
                    <strong className="block text-lg font-black text-white sm:text-2xl">Não encontrou seu duo?</strong>
                    <span className="text-zinc-400 font-normal text-sm sm:text-base">Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className="py-3 px-4 bg-[#141026]  text-white rounded flex gap-3 text-sm sm:text-lg">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}