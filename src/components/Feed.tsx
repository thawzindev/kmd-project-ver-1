import { DownloadIcon, FileIcon, MessageCircleIcon, TextIcon, TextQuoteIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const Feed = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex items-start space-x-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image className="aspect-square h-full w-full" alt="Sarrah" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYbWQRmPgmQIMT7oEJFZuFWoGPMhH59WUkyToaSfXsg&s" width={24} height={24} />
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">SR</span>
            </span>
            <div className="flex-1">
                <h5 className="text-md font-semibold">
                    Programme that pushes back the existing boundaries of personalised medicine
                    <Badge variant={'default'} className='mx-2 text-xs'>Eletricity</Badge>
                </h5>
                <p className="text-sm text-gray-500">Sarrah started 10 days ago</p>
                {/* <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error sit...</p> */}
                <div className="bg-slate-200 p-2 w-fit h-fit rounded-md mt-2">
                    <div className="file bg-white w-fit p-2 rounded-md text-gray-900">
                        <p className="text-sm">
                            <div className="flex">
                                <FileIcon className="text-gray-500 w-5 h-5" />
                                <span className="mx-2">sample.pdf</span>
                                <span className="mx-2 ">
                                    <DownloadIcon className="text-gray-500 w-5 h-5" />
                                </span>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2 items-center">
                <ThumbsUpIcon className="text-emerald-500" />
                <span>10</span>
                <ThumbsDownIcon className="text-red-500" />
                <span>6</span>
                <MessageCircleIcon className="text-blue-500" />
                <span>6</span>

                {/* <Button className="text-[#22C55E]" variant="ghost">
                    Comments
                </Button> */}
            </div>
        </div>
    )
}

export default Feed;