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
          <div className="py-[25px] px-0">
            <div className="relative z-10 flex justify-between items-center">
              <ul className="p-0 flex items-center gap-6">
                <li className="py-0 px-[15px]">
                  <a href="#0">About</a>
                </li>
                <li>
                  <a href="#0">Terms Of Use</a>
                </li>
                <li>
                  <a href="#0">Privacy Policy</a>
                </li>
                <li>
                  <a href="#0">FAQ</a>
                </li>
                <li>
                  <a href="#0">Feedback</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
