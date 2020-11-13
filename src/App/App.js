import { useEffect} from 'react';

function App() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }, [])

  return (
    <div>
      <h1>Foo</h1>
    </div>
  );
}

export default App;
