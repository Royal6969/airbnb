import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from 'date-fns';

function search() {

  const router = useRouter();

  //ES6 Destructuring
  const { 
    location, 
    startDate, 
    endDate, 
    numberOfGuest 
  } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMM yy");
  const formattedEndtDate = format(new Date(endDate), "dd MMM yy");
  const range = `${formattedStartDate} - ${formattedEndtDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuest} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuest} guest
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {/* reusable utily classname example */}
            <p className="button">Cancelation Flexibility</p> 
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default search
// me he quedado en el 1:44:00