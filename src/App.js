import Contact from './Components/Contact';
import User from './Components/User/User';
function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <Contact />
          {/* <User /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
