import Header from './Header';

const App = () => {
  return (
    <>
      <Header></Header>
      <div>
        <p>
          I'm so happy that you decided to visit my page! If you want to get to
          know me better you can read my blog or just look around. If you are
          here for any programming related stuff you can go straight to that
          section
        </p>
        <button>Content</button>
        <button>Business</button>
      </div>
      <main>
        <section>Content</section>
        <section>Business details</section>
      </main>
      <footer>Kamil Jakóbczak 2022</footer>
    </>
  );
};

export default App;
