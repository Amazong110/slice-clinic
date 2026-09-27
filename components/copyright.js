const Copyright = ({ name = "", extra = "" }) => {
  const year = new Date().getFullYear();
  return (
    <div>
      <p className="text-sm text-gray-400">
        © {year} {name}. {extra}
      </p>
    </div>
  );
};

export default Copyright;
