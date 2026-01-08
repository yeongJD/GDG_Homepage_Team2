const Footer = () => {
  return (
    <footer className="bg-grey-11 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-grey-4">
            &copy; {new Date().getFullYear()} GDG Homepage Team 2. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
