import logo from "../assets/images/logo.png";
function Footer() {
  return (
    <>
      <footer>
        <div className="max-w-[1170px] w-full px-[15px] mx-auto">
          <div className="border-b border-b-slate-600 relative z-10 flex justify-between">
            <div className="p-0 logo flex gap-3 items-center text-lg font-bold">
              <img src={logo} alt="footer" />
              <span>
                Tiket<span className="text-red-600">Go</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
