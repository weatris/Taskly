import { Button } from "../../components/Button";
import Stack from "../../components/Stack/Stack";

const inputStyle = "w-full p-2 border rounded-md border-gray-200 focus:border-gray-300 outline-none";

export const Login = () => {
  return <Stack className="w-full h-full bg-blue-50" justifyContent="center">
    <Stack className="w-[400px] overflow-hidden bg-white border rounded-lg shadow-md" direction="col">
        <p className="w-full py-2 bg-gray-50 text-xl text-center border-b">Login</p>
        <Stack className="w-full p-4 gap-4" direction="col">
        <input
            placeholder="Email"
            className={inputStyle}
          />
          <input
            placeholder="Password"
            className={inputStyle}
          />
          <Button className="w-full" text='Login'/>
        </Stack>
    </Stack>
  </Stack>;
};
