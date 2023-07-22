import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "pormptopia",
  descreption: " Discover and share Ai & Prompts ",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg" />
        <title>Promptopia</title>
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {" "}
            <Nav />
            {children}{" "}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
