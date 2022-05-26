
import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';
import {requests} from "./requests"

function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner/>
      <Row islargerow={true} title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals}/>
      <Row title="Trending Now" fetchURL={requests.fetchTrending}/>
      <Row title="Top Rated" fetchURL={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
      <Row title="Documentaries" fetchURL={requests.fetchDocumantaries}/>
      {/* <Row title="Best For Kids" fetchURL={requests.fetchForKids}/> */}
    </div>
  );
}

export default App;
