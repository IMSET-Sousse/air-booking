export default function Navbar() {
    return(
        <div>
            <header className="sticky top-0 z-50 px-5 py-2 bg-white shadow-md flex items-center justify-between">
              {/*left*/}

              <a href="/">
              <image
              src={"/air-booking.png"}
              widht={100}
              height={100}
              alt="air-booking logo"/>
              </a>
            </header>
        </div>
    )
}