import OffcanvasNavbar from "./components/OffcanvasNavbar";
import Forms from "./components/Forms";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div>
      <OffcanvasNavbar />
      <main className="mt-4">
        <Forms />
      </main>
    </div>
  );
}
