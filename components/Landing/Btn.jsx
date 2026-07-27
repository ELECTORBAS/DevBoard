import Link from "next/link";

const Btn = ({ title, link = "#" }) => {
  return (
    <Link
      href={link}
      className="transition-all duration-300"
    >
      {title}
    </Link>
  );
};

export default Btn;
