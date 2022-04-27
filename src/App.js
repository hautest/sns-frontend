import { Button } from "./components/Button";

function App() {
  return (
    <>
      <Button size={"lg"} buttonValue={"lg"} />
      <Button size={"md"} buttonValue={"md"} />
      <Button size={"sm"} buttonValue={"sm"} />
      <Button size={"xs"} buttonValue={"xs"} />
      <hr></hr>
      <Button size={"lg"} buttonValue={"lg"} state="disabled" />
      <Button size={"md"} buttonValue={"md"} state="disabled" />
      <Button size={"sm"} buttonValue={"sm"} state="disabled" />
      <Button size={"xs"} buttonValue={"xs"} state="disabled" />
    </>
  );
}

export default App;
