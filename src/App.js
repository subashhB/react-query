import { useState } from "react";
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const[page, setPage] = useState('planets')
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage= {setPage}/>
        <div className="content">
          {page === 'planets' ? <Planets/> : <People/>}
        </div>
      </div>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
