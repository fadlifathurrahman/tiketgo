import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer>
      <div className="max-w-[1170px] w-full px-[15px] mx-auto">
        <div className="border-b border-b-slate-600 relative z-10 flex justify-between">
          <div className="p-0 logo flex gap-3 items-center text-lg font-bold">
            <img src={logo} alt="footer" />
            <span>
              Tiket<span className="text-red-600">Go</span>
            </span>
          </div>
          {/* <ul className=" flex justify-between items-center">
            <li className="p-[7.5px]">
              <a
                href="#0"
                className="w-9 h-9 leading-9 text-center rounded-full border border-slate-600 text-sm inline-block hover:bg-green-400"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="p-[7.5px]">
              <a
                href="#0"
                className="w-9 h-9 leading-9 text-center rounded-full border border-slate-600 text-sm inline-block hover:bg-green-400"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="p-[7.5px]">
              <a
                href="#0"
                className="w-9 h-9 leading-9 text-center rounded-full border border-slate-600 text-sm inline-block hover:bg-green-400"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
            </li>
            <li className="p-[7.5px]">
              <a
                href="#0"
                className="w-9 h-9 leading-9 text-center rounded-full border border-slate-600 text-sm inline-block hover:bg-green-400"
              >
                <i className="fab fa-google"></i>
              </a>
            </li>
            <li className="p-[7.5px]">
              <a
                href="#0"
                className="w-9 h-9 leading-9 text-center rounded-full border border-slate-600 text-sm inline-block hover:bg-green-400"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul> */}
        </div>
        <div className="py-[25px] px-0">
          <div className="relative z-10 flex justify-between items-center">
            <div className="left">
              <p>
                Copyright ©2024. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
