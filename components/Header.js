import Image from "next/image";
import { 
    GlobeAltIcon,
    MenuIcon, 
    UserCircleIcon,
    SearchIcon,
    UsersIcon,
} from '@heroicons/react/solid'; //npm install @heroicons/react
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {

    //una vez acabado el index.js (homeScreen), vamos ahora ha hacer el Calendar y Search 
    //para ello necesitamos usar el State del input del Header
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numberOfGuest, setNumberOfGuest] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };

    const search = () => { //we don't use redux here because doing by this way, when you search someplace, you can share your search sending the url page...
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberOfGuest,
            },
        });
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    return ( //esto fue lo 1º
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            {/* left */}
            <div 
                onClick={() => router.push('/')} 
                className="relative flex items-center h-10 cursor-pointer my-auto">
                    <Image 
                        src="https://links.papareact.com/qd3"
                        layout="fill"
                        objectFit="contain"
                        objectPosition="left"
                    />
            </div>

            {/* Middle - Search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                    value={searchInput} //conecting the useState
                    onChange={(e) => setSearchInput(e.target.value)} //conecting the useState
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" 
                    type="text" 
                    placeholder={placeholder || "Start your search"} 
                />
                <SearchIcon className="hidden md:inline h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {/* npm install --save react-date-range */}
            {/* npm install --save react date-fns */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker 
                        ranges={[selectionRange]} 
                        minDate={new Date()}
                        rangeColors={["#FD5861"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guest
                        </h2>
                        
                        <UsersIcon className="h-5" />
                        <input
                            value={numberOfGuest}
                            onChange={(e) => setNumberOfGuest(e.target.value)}
                            type="number" 
                            min={1}
                            className="w-12 pl-2 text-lg outline-none text-red-400" 
                        />
                    </div>
                    <div className="flex">
                        <button 
                            className="flex-grow text-gray-500"
                            onClick={resetInput}
                        >
                            Cancel
                        </button>
                        <button 
                            className="flex-grow text-red-400"
                            onClick={search} //we don't use redux here because doing by this way, when you search someplace, you can share your search sending the url page...
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
            
        </header>
    );
}

export default Header