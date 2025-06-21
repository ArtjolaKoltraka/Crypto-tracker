import { format } from "date-fns";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-[70px] py-[15px] bg-gray-400/30 text-neutral-700 text-sm font-urbanist-regular z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>Coin Tracker {format(new Date(), "yyyy")}®</p>
        <div className="flex items-center gap-2">
          <p>
            Made with <span className="text-blue-500">💙</span> by{" "}
            <a
              href="https://github.com/ArtjolaKoltraka"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Artjola Koltraka
            </a>
          </p>
        </div>
        <p>© All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
